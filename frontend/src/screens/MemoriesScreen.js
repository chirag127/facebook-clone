import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { generateShareableUrl, shareContent } from "../utils/linkingUtils";

const MemoriesScreen = ({ navigation }) => {
    // Placeholder data for memories
    const [memories, setMemories] = useState([
        {
            id: "1",
            title: "3 Years Ago",
            date: "June 15, 2021",
            image: "https://via.placeholder.com/400x300",
            likes: 24,
            comments: 5,
            isLiked: false,
        },
        {
            id: "2",
            title: "1 Year Ago",
            date: "June 15, 2023",
            image: "https://via.placeholder.com/400x300",
            likes: 42,
            comments: 8,
            isLiked: true,
        },
        {
            id: "3",
            title: "5 Years Ago",
            date: "June 15, 2019",
            image: "https://via.placeholder.com/400x300",
            likes: 18,
            comments: 3,
            isLiked: false,
        },
    ]);

    const handleLikeMemory = (id) => {
        setMemories(
            memories.map((memory) => {
                if (memory.id === id) {
                    const wasLiked = memory.isLiked;
                    return {
                        ...memory,
                        isLiked: !wasLiked,
                        likes: wasLiked ? memory.likes - 1 : memory.likes + 1,
                    };
                }
                return memory;
            })
        );
    };

    const handleCommentMemory = (memory) => {
        Alert.alert(
            "Comment",
            `Add a comment to this memory from ${memory.date}`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Comment",
                    onPress: () => {
                        // In a real app, would open a comment input form
                        Alert.alert(
                            "Comment Added",
                            "Your comment has been added"
                        );
                        // Update comment count in state
                        setMemories(
                            memories.map((item) => {
                                if (item.id === memory.id) {
                                    return {
                                        ...item,
                                        comments: item.comments + 1,
                                    };
                                }
                                return item;
                            })
                        );
                    },
                },
            ]
        );
    };

    const handleShareMemory = (memory) => {
        const shareableUrl = generateShareableUrl("memories", {
            memoryId: memory.id,
        });

        Alert.alert(
            "Share Memory",
            "Choose how you'd like to share this memory",
            [
                {
                    text: "Share to News Feed",
                    onPress: () => {
                        Alert.alert(
                            "Share to News Feed",
                            "Memory has been shared to your news feed"
                        );
                    },
                },
                {
                    text: "Share to Your Story",
                    onPress: () => {
                        Alert.alert(
                            "Share to Story",
                            "Memory has been shared to your story"
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
                            title: `${memory.title} - Memory from Facebook`,
                            message: `Check out this memory from ${memory.date}!`,
                            url: shareableUrl,
                        });
                    },
                },
                { text: "Cancel", style: "cancel" },
            ]
        );
    };

    const handleMemoryOptions = (memory) => {
        Alert.alert(
            "Memory Options",
            "What would you like to do with this memory?",
            [
                {
                    text: "View on Timeline",
                    onPress: () =>
                        Alert.alert(
                            "Timeline",
                            `Viewing memory from ${memory.date} on your timeline`
                        ),
                },
                {
                    text: "Hide from Timeline",
                    onPress: () =>
                        Alert.alert(
                            "Hidden",
                            `Memory from ${memory.date} has been hidden`
                        ),
                },
                {
                    text: "Delete Memory",
                    style: "destructive",
                    onPress: () => {
                        Alert.alert(
                            "Delete Memory",
                            "Are you sure you want to delete this memory?",
                            [
                                { text: "Cancel", style: "cancel" },
                                {
                                    text: "Delete",
                                    style: "destructive",
                                    onPress: () => {
                                        setMemories(
                                            memories.filter(
                                                (item) => item.id !== memory.id
                                            )
                                        );
                                        Alert.alert(
                                            "Deleted",
                                            "Memory has been deleted"
                                        );
                                    },
                                },
                            ]
                        );
                    },
                },
                { text: "Cancel", style: "cancel" },
            ]
        );
    };

    const handleSettingsPress = () => {
        Alert.alert(
            "Memories Settings",
            "Configure your memories preferences",
            [
                {
                    text: "Memories Notifications",
                    onPress: () =>
                        Alert.alert(
                            "Notifications",
                            "Configure when and how you're notified about memories"
                        ),
                },
                {
                    text: "Hide Memories",
                    onPress: () =>
                        Alert.alert(
                            "Hide Memories",
                            "Choose dates or people to hide from Memories"
                        ),
                },
                {
                    text: "Preferences",
                    onPress: () =>
                        Alert.alert(
                            "Preferences",
                            "Choose your memories display preferences"
                        ),
                },
                { text: "Cancel", style: "cancel" },
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.memoryCard}>
            <View style={styles.memoryHeader}>
                <View>
                    <Text style={styles.memoryTitle}>{item.title}</Text>
                    <Text style={styles.memoryDate}>{item.date}</Text>
                </View>
                <TouchableOpacity onPress={() => handleMemoryOptions(item)}>
                    <Ionicons
                        name="ellipsis-horizontal"
                        size={20}
                        color="#65676B"
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                    Alert.alert("Memory", `Viewing memory from ${item.date}`)
                }
            >
                <Image
                    source={{ uri: item.image }}
                    style={styles.memoryImage}
                />
            </TouchableOpacity>
            <View style={styles.memoryFooter}>
                <View style={styles.memoryStats}>
                    <TouchableOpacity
                        style={styles.statItem}
                        onPress={() =>
                            Alert.alert(
                                "Likes",
                                `${item.likes} people liked this memory`
                            )
                        }
                    >
                        <Ionicons name="heart" size={16} color="#E41E3F" />
                        <Text style={styles.statText}>{item.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.statItem}
                        onPress={() =>
                            Alert.alert(
                                "Comments",
                                `${item.comments} comments on this memory`
                            )
                        }
                    >
                        <Ionicons
                            name="chatbubble-outline"
                            size={16}
                            color="#65676B"
                        />
                        <Text style={styles.statText}>{item.comments}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.memoryActions}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleLikeMemory(item.id)}
                    >
                        <Ionicons
                            name={item.isLiked ? "heart" : "heart-outline"}
                            size={22}
                            color={item.isLiked ? "#E41E3F" : "#65676B"}
                        />
                        <Text
                            style={[
                                styles.actionText,
                                item.isLiked && styles.activeActionText,
                            ]}
                        >
                            Like
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleCommentMemory(item)}
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
                        onPress={() => handleShareMemory(item)}
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
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1877F2" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Memories</Text>
                <TouchableOpacity onPress={handleSettingsPress}>
                    <Ionicons
                        name="settings-outline"
                        size={24}
                        color="#1877F2"
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.banner}>
                <Ionicons name="time" size={30} color="#1877F2" />
                <View style={styles.bannerText}>
                    <Text style={styles.bannerTitle}>Your memories</Text>
                    <Text style={styles.bannerSubtitle}>
                        We'll show you past posts to help you reminisce and
                        connect.
                    </Text>
                </View>
            </View>

            <FlatList
                data={memories}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons
                            name="time"
                            size={60}
                            color="#1877F2"
                            style={styles.emptyIcon}
                        />
                        <Text style={styles.emptyText}>No memories yet</Text>
                        <Text style={styles.emptySubtext}>
                            Check back later for memories from your past
                        </Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f2f5",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    banner: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    bannerText: {
        marginLeft: 15,
        flex: 1,
    },
    bannerTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    bannerSubtitle: {
        fontSize: 14,
        color: "#65676B",
    },
    listContainer: {
        padding: 10,
    },
    memoryCard: {
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 10,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    memoryHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
    },
    memoryTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    memoryDate: {
        fontSize: 14,
        color: "#65676B",
    },
    memoryImage: {
        width: "100%",
        height: 300,
        resizeMode: "cover",
    },
    memoryFooter: {
        padding: 12,
    },
    memoryStats: {
        flexDirection: "row",
        marginBottom: 10,
    },
    statItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15,
    },
    statText: {
        marginLeft: 5,
        fontSize: 14,
        color: "#65676B",
    },
    memoryActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        paddingTop: 10,
    },
    actionButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
    },
    actionText: {
        marginLeft: 5,
        fontSize: 14,
        color: "#65676B",
    },
    activeActionText: {
        color: "#E41E3F",
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
    },
    emptyIcon: {
        marginBottom: 15,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    emptySubtext: {
        fontSize: 14,
        color: "#65676B",
        textAlign: "center",
    },
});

export default MemoriesScreen;
