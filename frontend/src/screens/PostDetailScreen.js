import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import {
    getPost,
    getComments,
    addComment,
    likePost,
    unlikePost,
} from "../api/api";
import CommentItem from "../components/CommentItem";
import { generateShareableUrl, shareContent } from "../utils/linkingUtils";

const PostDetailScreen = ({ route, navigation }) => {
    const { postId } = route.params;
    const { userInfo } = useContext(AuthContext);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchPostAndComments();
    }, [postId]);

    const fetchPostAndComments = async () => {
        try {
            setLoading(true);
            const postResponse = await getPost(postId);
            setPost(postResponse.data.data);

            const commentsResponse = await getComments(postId);
            setComments(commentsResponse.data.data);
        } catch (error) {
            console.log("Error fetching post details:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async () => {
        try {
            const isLiked = post.likes.includes(userInfo._id);

            if (isLiked) {
                await unlikePost(post._id);
            } else {
                await likePost(post._id);
            }

            // Refresh post data
            const response = await getPost(postId);
            setPost(response.data.data);
        } catch (error) {
            console.log("Error liking/unliking post:", error);
        }
    };

    const handleAddComment = async () => {
        if (!commentText.trim()) return;

        try {
            setSubmitting(true);
            await addComment(postId, { text: commentText });
            setCommentText("");

            // Refresh comments
            const commentsResponse = await getComments(postId);
            setComments(commentsResponse.data.data);
        } catch (error) {
            console.log("Error adding comment:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleSharePress = () => {
        const shareableUrl = generateShareableUrl("post", { postId: post._id });

        Alert.alert("Share Post", "Choose how you'd like to share this post", [
            {
                text: "Share to News Feed",
                onPress: () => {
                    Alert.alert(
                        "Share to News Feed",
                        "Post has been shared to your news feed"
                    );
                },
            },
            {
                text: "Share to Your Story",
                onPress: () => {
                    Alert.alert(
                        "Share to Story",
                        "Post has been shared to your story"
                    );
                },
            },
            {
                text: "Send in Messenger",
                onPress: () => {
                    Alert.alert(
                        "Send in Messenger",
                        "Choose a friend to share with"
                    );
                },
            },
            {
                text: "Share via...",
                onPress: () => {
                    shareContent({
                        title: `${post.user.name}'s Post`,
                        message: post.text || "Check out this post!",
                        url: shareableUrl,
                    });
                },
            },
            {
                text: "Copy Link",
                onPress: async () => {
                    try {
                        const { setStringAsync } = require("expo-clipboard");
                        await setStringAsync(shareableUrl);
                        Alert.alert("Success", "Link copied to clipboard");
                    } catch (error) {
                        console.error("Failed to copy link", error);
                        Alert.alert("Error", "Failed to copy link");
                    }
                },
            },
            { text: "Cancel", style: "cancel" },
        ]);
    };

    const handleMorePress = () => {
        Alert.alert("Post Options", "Choose an action for this post", [
            {
                text: "Save Post",
                onPress: () => Alert.alert("Saved", "Post has been saved"),
            },
            {
                text: "Hide Post",
                onPress: () =>
                    Alert.alert(
                        "Hidden",
                        "Post has been hidden from your feed"
                    ),
            },
            {
                text: "Report Post",
                onPress: () =>
                    Alert.alert("Report", "Post has been reported for review"),
            },
            { text: "Cancel", style: "cancel" },
        ]);
    };

    const focusCommentInput = () => {
        // In a real implementation, we would focus the input
        Alert.alert("Comment", "Add a comment to this post");
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1877F2" />
            </View>
        );
    }

    const isLiked = post.likes.includes(userInfo._id);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={90}
        >
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.postContainer}>
                    <View style={styles.postHeader}>
                        <TouchableOpacity
                            style={styles.userInfo}
                            onPress={() =>
                                navigation.navigate("UserProfile", {
                                    userId: post.user._id,
                                })
                            }
                        >
                            <Image
                                source={{
                                    uri:
                                        post.user.profilePicture ||
                                        "https://via.placeholder.com/150",
                                }}
                                style={styles.profilePic}
                            />
                            <View>
                                <Text style={styles.userName}>
                                    {post.user.name}
                                </Text>
                                <Text style={styles.postTime}>
                                    {new Date(
                                        post.createdAt
                                    ).toLocaleDateString()}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.moreButton}
                            onPress={handleMorePress}
                        >
                            <Ionicons
                                name="ellipsis-horizontal"
                                size={20}
                                color="#65676B"
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.postText}>{post.text}</Text>

                    {post.image && (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() =>
                                Alert.alert(
                                    "Full Image",
                                    "View full size image"
                                )
                            }
                        >
                            <Image
                                source={{ uri: post.image }}
                                style={styles.postImage}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    )}

                    <View style={styles.postStats}>
                        <TouchableOpacity
                            style={styles.likesContainer}
                            onPress={() =>
                                Alert.alert(
                                    "Likes",
                                    `${post.likes.length} people liked this post`
                                )
                            }
                        >
                            <View style={styles.likeIcon}>
                                <Ionicons
                                    name="thumbs-up"
                                    size={12}
                                    color="#fff"
                                />
                            </View>
                            <Text style={styles.statsText}>
                                {post.likes.length}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                Alert.alert(
                                    "Comments",
                                    `${post.comments.length} comments on this post`
                                )
                            }
                        >
                            <Text style={styles.statsText}>
                                {post.comments.length} comments
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.actionsContainer}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={handleLike}
                        >
                            <Ionicons
                                name={
                                    isLiked ? "thumbs-up" : "thumbs-up-outline"
                                }
                                size={22}
                                color={isLiked ? "#1877F2" : "#65676B"}
                            />
                            <Text
                                style={[
                                    styles.actionText,
                                    isLiked && { color: "#1877F2" },
                                ]}
                            >
                                Like
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={focusCommentInput}
                        >
                            <Ionicons
                                name="chatbubble-outline"
                                size={22}
                                color="#65676B"
                            />
                            <Text style={styles.actionText}>Comment</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={handleSharePress}
                        >
                            <Ionicons
                                name="share-outline"
                                size={22}
                                color="#65676B"
                            />
                            <Text style={styles.actionText}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.commentsContainer}>
                    <Text style={styles.commentsHeader}>Comments</Text>

                    {comments.length === 0 ? (
                        <Text style={styles.noCommentsText}>
                            No comments yet. Be the first to comment!
                        </Text>
                    ) : (
                        comments.map((comment) => (
                            <CommentItem
                                key={comment._id}
                                comment={comment}
                                currentUserId={userInfo._id}
                                onRefresh={fetchPostAndComments}
                            />
                        ))
                    )}
                </View>
            </ScrollView>

            <View style={styles.commentInputContainer}>
                <Image
                    source={{
                        uri:
                            userInfo?.profilePicture ||
                            "https://via.placeholder.com/150",
                    }}
                    style={styles.commentProfilePic}
                />
                <TextInput
                    style={styles.commentInput}
                    placeholder="Write a comment..."
                    value={commentText}
                    onChangeText={setCommentText}
                    multiline
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={handleAddComment}
                    disabled={submitting || !commentText.trim()}
                >
                    {submitting ? (
                        <ActivityIndicator size="small" color="#1877F2" />
                    ) : (
                        <Ionicons name="send" size={24} color="#1877F2" />
                    )}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f2f5",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    scrollContainer: {
        flex: 1,
    },
    postContainer: {
        backgroundColor: "#fff",
        padding: 12,
    },
    postHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userName: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#050505",
    },
    postTime: {
        color: "#65676B",
        fontSize: 12,
    },
    moreButton: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    postText: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 22,
    },
    postImage: {
        width: "100%",
        height: 300,
        borderRadius: 8,
        marginBottom: 10,
    },
    postStats: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    likesContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    likeIcon: {
        backgroundColor: "#1877F2",
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 5,
    },
    statsText: {
        color: "#65676B",
        fontSize: 13,
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
    },
    actionButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
    },
    actionText: {
        marginLeft: 5,
        color: "#65676B",
        fontWeight: "bold",
        fontSize: 13,
    },
    commentsContainer: {
        backgroundColor: "#fff",
        marginTop: 8,
        padding: 12,
    },
    commentsHeader: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    noCommentsText: {
        color: "#65676B",
        textAlign: "center",
        padding: 15,
    },
    commentInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: "#E4E6EB",
    },
    commentProfilePic: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        marginRight: 8,
    },
    commentInput: {
        flex: 1,
        backgroundColor: "#F0F2F5",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        maxHeight: 100,
    },
    sendButton: {
        marginLeft: 8,
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default PostDetailScreen;
