import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DEFAULT_PROFILE_IMAGE } from "../utils/constants";
import { generateShareableUrl, shareContent } from "../utils/linkingUtils";

const PostItem = ({
    post,
    onLike,
    onComment,
    onProfilePress,
    currentUserId,
}) => {
    const isLiked = post.likes.includes(currentUserId);

    const formatDate = (dateString) => {
        const now = new Date();
        const postDate = new Date(dateString);
        const diffTime = Math.abs(now - postDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffTime / (1000 * 60));

        if (diffMinutes < 60) {
            return `${diffMinutes}m`;
        } else if (diffHours < 24) {
            return `${diffHours}h`;
        } else if (diffDays < 7) {
            return `${diffDays}d`;
        } else {
            return postDate.toLocaleDateString();
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
            { text: "Save Post", onPress: () => console.log("Save Post") },
            { text: "Hide Post", onPress: () => console.log("Hide Post") },
            { text: "Report Post", onPress: () => console.log("Report Post") },
            { text: "Cancel", style: "cancel" },
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.userInfo}
                    onPress={onProfilePress}
                >
                    <Image
                        source={{
                            uri:
                                post.user.profilePicture ||
                                DEFAULT_PROFILE_IMAGE,
                        }}
                        style={styles.profilePic}
                    />
                    <View>
                        <Text style={styles.userName}>{post.user.name}</Text>
                        <View style={styles.postMetaContainer}>
                            <Text style={styles.postTime}>
                                {formatDate(post.createdAt)}
                            </Text>
                            <Text style={styles.postDot}>•</Text>
                            <Ionicons name="earth" size={12} color="#65676B" />
                        </View>
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
                        Alert.alert("Full Image", "View full size image")
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
                        <Ionicons name="thumbs-up" size={12} color="#fff" />
                    </View>
                    <Text style={styles.statsText}>{post.likes.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onComment}>
                    <Text style={styles.statsText}>
                        {post.comments.length} comments
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => onLike(isLiked)}
                >
                    <Ionicons
                        name={isLiked ? "thumbs-up" : "thumbs-up-outline"}
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
                    onPress={onComment}
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
                        name="share-social-outline"
                        size={22}
                        color="#65676B"
                    />
                    <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginBottom: 8,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    header: {
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
    postMetaContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    postTime: {
        color: "#65676B",
        fontSize: 12,
    },
    postDot: {
        color: "#65676B",
        fontSize: 12,
        marginHorizontal: 4,
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
        color: "#050505",
    },
    postImage: {
        width: "100%",
        height: 300,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: "#f0f2f5",
    },
    postStats: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    divider: {
        height: 1,
        backgroundColor: "#E4E6EB",
        marginBottom: 5,
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
        paddingVertical: 5,
    },
    actionButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 6,
        borderRadius: 5,
    },
    actionText: {
        marginLeft: 5,
        color: "#65676B",
        fontWeight: "500",
        fontSize: 13,
    },
});

export default PostItem;
