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

                        <TouchableOpacity style={styles.moreButton}>
                            <Ionicons
                                name="ellipsis-horizontal"
                                size={20}
                                color="#65676B"
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.postText}>{post.text}</Text>

                    {post.image && (
                        <Image
                            source={{ uri: post.image }}
                            style={styles.postImage}
                            resizeMode="cover"
                        />
                    )}

                    <View style={styles.postStats}>
                        <View style={styles.likesContainer}>
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
                        </View>
                        <Text style={styles.statsText}>
                            {post.comments.length} comments
                        </Text>
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

                        <TouchableOpacity style={styles.actionButton}>
                            <Ionicons
                                name="chatbubble-outline"
                                size={22}
                                color="#65676B"
                            />
                            <Text style={styles.actionText}>Comment</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton}>
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
                    style={[
                        styles.sendButton,
                        !commentText.trim() && styles.disabledButton,
                    ]}
                    onPress={handleAddComment}
                    disabled={!commentText.trim() || submitting}
                >
                    {submitting ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Ionicons name="send" size={20} color="#fff" />
                    )}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F2F5",
    },
    scrollContainer: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    postContainer: {
        backgroundColor: "#fff",
        padding: 15,
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
        borderRadius: 10,
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
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
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
        fontWeight: "500",
    },
    commentsContainer: {
        backgroundColor: "#fff",
        marginTop: 8,
        padding: 15,
        paddingBottom: 70,
    },
    commentsHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    noCommentsText: {
        color: "#65676B",
        textAlign: "center",
        padding: 20,
    },
    commentInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#E4E6EB",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    commentProfilePic: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 10,
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
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#1877F2",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },
    disabledButton: {
        backgroundColor: "#BCC0C4",
    },
});

export default PostDetailScreen;
