import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { likeComment, unlikeComment, deleteComment } from "../api/api";

const CommentItem = ({ comment, currentUserId, onRefresh }) => {
    const [isLiked, setIsLiked] = useState(
        comment.likes.includes(currentUserId)
    );
    const [likesCount, setLikesCount] = useState(comment.likes.length);

    const isOwner = comment.user._id === currentUserId;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const handleLike = async () => {
        try {
            if (isLiked) {
                await unlikeComment(comment._id);
                setLikesCount(likesCount - 1);
            } else {
                await likeComment(comment._id);
                setLikesCount(likesCount + 1);
            }
            setIsLiked(!isLiked);
        } catch (error) {
            console.log("Error liking/unliking comment:", error);
        }
    };

    const handleDelete = () => {
        Alert.alert(
            "Delete Comment",
            "Are you sure you want to delete this comment?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteComment(comment._id);
                            onRefresh();
                        } catch (error) {
                            console.log("Error deleting comment:", error);
                        }
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri:
                        comment.user.profilePicture ||
                        "https://via.placeholder.com/150",
                }}
                style={styles.profilePic}
            />

            <View style={styles.commentContent}>
                <View style={styles.commentBubble}>
                    <Text style={styles.userName}>{comment.user.name}</Text>
                    <Text style={styles.commentText}>{comment.text}</Text>
                </View>

                <View style={styles.commentActions}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleLike}
                    >
                        <Text
                            style={[
                                styles.actionText,
                                isLiked && styles.activeActionText,
                            ]}
                        >
                            Like
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionText}>Reply</Text>
                    </TouchableOpacity>

                    <Text style={styles.commentTime}>
                        {formatDate(comment.createdAt)}
                    </Text>

                    {likesCount > 0 && (
                        <View style={styles.likesContainer}>
                            <Ionicons
                                name="thumbs-up"
                                size={12}
                                color="#1877F2"
                            />
                            <Text style={styles.likesCount}>{likesCount}</Text>
                        </View>
                    )}
                </View>
            </View>

            {isOwner && (
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDelete}
                >
                    <Ionicons name="trash-outline" size={16} color="#65676B" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 15,
        paddingRight: 10,
    },
    profilePic: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 8,
    },
    commentContent: {
        flex: 1,
    },
    commentBubble: {
        backgroundColor: "#F0F2F5",
        borderRadius: 18,
        padding: 12,
    },
    userName: {
        fontWeight: "bold",
        marginBottom: 2,
    },
    commentText: {
        fontSize: 14,
        lineHeight: 20,
    },
    commentActions: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
        paddingLeft: 10,
    },
    actionButton: {
        marginRight: 15,
    },
    actionText: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#65676B",
    },
    activeActionText: {
        color: "#1877F2",
    },
    commentTime: {
        fontSize: 12,
        color: "#65676B",
        marginRight: 15,
    },
    likesContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E4E6EB",
    },
    likesCount: {
        fontSize: 12,
        color: "#65676B",
        marginLeft: 3,
    },
    deleteButton: {
        padding: 5,
    },
});

export default CommentItem;
