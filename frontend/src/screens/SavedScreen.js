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

const SavedScreen = ({ navigation }) => {
    // Placeholder data for saved items
    const savedItems = [
        {
            id: "1",
            title: "How to build a React Native app",
            source: "React Native Community",
            date: "2 days ago",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: "2",
            title: "10 tips for better code",
            source: "Dev.to",
            date: "1 week ago",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: "3",
            title: "Understanding JavaScript Promises",
            source: "MDN Web Docs",
            date: "2 weeks ago",
            image: "https://via.placeholder.com/300x200",
        },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.savedItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSource}>{item.source}</Text>
                <Text style={styles.itemDate}>{item.date}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1877F2" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Saved Items</Text>
                <TouchableOpacity>
                    <Ionicons name="search" size={24} color="#1877F2" />
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

export default SavedScreen;
