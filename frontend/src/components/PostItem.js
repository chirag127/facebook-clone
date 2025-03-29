import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DEFAULT_PROFILE_IMAGE } from "../utils/constants";

const PostItem = ({
    post,
    onLike,
    onComment,
    onProfilePress,
    currentUserId,
}) => {
    const isLiked = post.likes.includes(currentUserId);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
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
                        <Text style={styles.postTime}>
                            {formatDate(post.createdAt)}
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
                        <Ionicons name="thumbs-up" size={12} color="#fff" />
                    </View>
                    <Text style={styles.statsText}>{post.likes.length}</Text>
                </View>
                <Text style={styles.statsText}>
                    {post.comments.length} comments
                </Text>
            </View>

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

                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="share-outline" size={22} color="#65676B" />
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
});

export default PostItem;
