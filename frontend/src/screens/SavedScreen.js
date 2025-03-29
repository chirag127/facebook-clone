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

const SavedScreen = ({ navigation }) => {
    // Placeholder data for saved items
    const [savedItems, setSavedItems] = useState([
        {
            id: "1",
            title: "How to build a React Native app",
            source: "React Native Community",
            date: "2 days ago",
            image: "https://via.placeholder.com/300x200",
            type: "article",
        },
        {
            id: "2",
            title: "10 tips for better code",
            source: "Dev.to",
            date: "1 week ago",
            image: "https://via.placeholder.com/300x200",
            type: "article",
        },
        {
            id: "3",
            title: "Understanding JavaScript Promises",
            source: "MDN Web Docs",
            date: "2 weeks ago",
            image: "https://via.placeholder.com/300x200",
            type: "article",
        },
    ]);

    const [activeFilter, setActiveFilter] = useState("all");

    const handleSearch = () => {
        Alert.alert("Search", "Search your saved items", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Search",
                onPress: () => Alert.alert("Search Results", "Searching through your saved items")
            },
        ]);
    };

    const handleItemPress = (item) => {
        Alert.alert(
            item.title,
            `View this ${item.type} from ${item.source}`,
            [
                { text: "Open", onPress: () => Alert.alert("Opening", `Opening ${item.title}`) },
                {
                    text: "Share",
                    onPress: () => Alert.alert("Share", `Sharing ${item.title}`)
                },
                {
                    text: "Remove from Saved",
                    style: "destructive",
                    onPress: () => {
                        setSavedItems(savedItems.filter(savedItem => savedItem.id !== item.id));
                        Alert.alert("Removed", `"${item.title}" has been removed from your saved items`);
                    }
                },
                { text: "Cancel", style: "cancel" },
            ]
        );
    };

    const handleFilterPress = (filter) => {
        setActiveFilter(filter);
        Alert.alert("Filter Applied", `Showing ${filter} saved items`);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.savedItem}
            onPress={() => handleItemPress(item)}
        >
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSource}>{item.source}</Text>
                <Text style={styles.itemDate}>{item.date}</Text>
            </View>
            <TouchableOpacity
                style={styles.itemOptions}
                onPress={() => {
                    Alert.alert(
                        "Options",
                        `What would you like to do with "${item.title}"?`,
                        [
                            {
                                text: "Share",
                                onPress: () => Alert.alert("Share", `Sharing ${item.title}`)
                            },
                            {
                                text: "Remove from Saved",
                                style: "destructive",
                                onPress: () => {
                                    setSavedItems(savedItems.filter(savedItem => savedItem.id !== item.id));
                                    Alert.alert("Removed", `"${item.title}" has been removed from your saved items`);
                                }
                            },
                            { text: "Cancel", style: "cancel" },
                        ]
                    );
                }}
            >
                <Ionicons name="ellipsis-horizontal" size={20} color="#65676B" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1877F2" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Saved Items</Text>
                <TouchableOpacity onPress={handleSearch}>
                    <Ionicons name="search" size={24} color="#1877F2" />
                </TouchableOpacity>
            </View>

            <View style={styles.filters}>
                <TouchableOpacity
                    style={[styles.filterButton, activeFilter === "all" && styles.activeFilter]}
                    onPress={() => handleFilterPress("all")}
                >
                    <Text style={[styles.filterText, activeFilter === "all" && styles.activeFilterText]}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, activeFilter === "articles" && styles.activeFilter]}
                    onPress={() => handleFilterPress("articles")}
                >
                    <Text style={[styles.filterText, activeFilter === "articles" && styles.activeFilterText]}>Articles</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, activeFilter === "videos" && styles.activeFilter]}
                    onPress={() => handleFilterPress("videos")}
                >
                    <Text style={[styles.filterText, activeFilter === "videos" && styles.activeFilterText]}>Videos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, activeFilter === "photos" && styles.activeFilter]}
                    onPress={() => handleFilterPress("photos")}
                >
                    <Text style={[styles.filterText, activeFilter === "photos" && styles.activeFilterText]}>Photos</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={savedItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons
                            name="bookmark"
                            size={60}
                            color="#1877F2"
                            style={styles.emptyIcon}
                        />
                        <Text style={styles.emptyText}>No saved items yet</Text>
                        <Text style={styles.emptySubtext}>
                            Items you save will appear here
                        </Text>
                        <TouchableOpacity
                            style={styles.findItemsButton}
                            onPress={() => navigation.navigate("Home")}
                        >
                            <Text style={styles.findItemsText}>Browse Content</Text>
                        </TouchableOpacity>
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
    filters: {
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    filterButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginHorizontal: 4,
        borderRadius: 20,
        backgroundColor: "#f0f2f5",
    },
    activeFilter: {
        backgroundColor: "#E7F3FF",
    },
    filterText: {
        color: "#65676B",
        fontSize: 14,
    },
    activeFilterText: {
        color: "#1877F2",
        fontWeight: "500",
    },
    listContainer: {
        padding: 10,
    },
    savedItem: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 4,
    },
    itemContent: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "center",
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    itemSource: {
        fontSize: 14,
        color: "#65676B",
        marginBottom: 2,
    },
    itemDate: {
        fontSize: 12,
        color: "#8A8D91",
    },
    itemOptions: {
        padding: 8,
        justifyContent: "center",
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
        marginBottom: 20,
    },
    findItemsButton: {
        backgroundColor: "#1877F2",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    findItemsText: {
        color: "#fff",
        fontWeight: "500",
    },
});

export default SavedScreen;
