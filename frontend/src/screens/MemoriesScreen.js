import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MemoriesScreen = ({ navigation }) => {
    // Placeholder data for memories
    const memories = [
        {
            id: "1",
            title: "3 Years Ago",
            date: "June 15, 2021",
            image: "https://via.placeholder.com/400x300",
            likes: 24,
            comments: 5,
        },
        {
            id: "2",
            title: "1 Year Ago",
            date: "June 15, 2023",
            image: "https://via.placeholder.com/400x300",
            likes: 42,
            comments: 8,
        },
        {
            id: "3",
            title: "5 Years Ago",
            date: "June 15, 2019",
            image: "https://via.placeholder.com/400x300",
            likes: 18,
            comments: 3,
        },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.memoryCard}>
            <View style={styles.memoryHeader}>
                <View>
                    <Text style={styles.memoryTitle}>{item.title}</Text>
                    <Text style={styles.memoryDate}>{item.date}</Text>
                </View>
                <TouchableOpacity>
                    <Ionicons
                        name="ellipsis-horizontal"
                        size={20}
                        color="#65676B"
                    />
                </TouchableOpacity>
            </View>
            <Image source={{ uri: item.image }} style={styles.memoryImage} />
            <View style={styles.memoryFooter}>
                <View style={styles.memoryStats}>
                    <View style={styles.statItem}>
                        <Ionicons name="heart" size={16} color="#E41E3F" />
                        <Text style={styles.statText}>{item.likes}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Ionicons
                            name="chatbubble-outline"
                            size={16}
                            color="#65676B"
                        />
                        <Text style={styles.statText}>{item.comments}</Text>
                    </View>
                </View>
                <View style={styles.memoryActions}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons
                            name="heart-outline"
                            size={22}
                            color="#65676B"
                        />
                        <Text style={styles.actionText}>Like</Text>
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
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1877F2" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Memories</Text>
                <TouchableOpacity>
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingVertical: 8,
    },
    actionText: {
        marginLeft: 5,
        fontSize: 14,
        color: "#65676B",
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 50,
    },
    emptyIcon: {
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: "#65676B",
        textAlign: "center",
    },
});

export default MemoriesScreen;
