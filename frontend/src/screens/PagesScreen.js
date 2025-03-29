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

const PagesScreen = ({ navigation }) => {
    // Placeholder data for pages
    const pages = [
        {
            id: "1",
            name: "React Native Community",
            category: "Technology",
            followers: "1.2M followers",
            image: "https://via.placeholder.com/100",
            isLiked: true,
        },
        {
            id: "2",
            name: "JavaScript Developers",
            category: "Technology",
            followers: "850K followers",
            image: "https://via.placeholder.com/100",
            isLiked: true,
        },
        {
            id: "3",
            name: "UI/UX Design",
            category: "Design",
            followers: "2.5M followers",
            image: "https://via.placeholder.com/100",
            isLiked: false,
        },
        {
            id: "4",
            name: "Mobile App Development",
            category: "Technology",
            followers: "1.8M followers",
            image: "https://via.placeholder.com/100",
            isLiked: false,
        },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.pageItem}>
            <Image source={{ uri: item.image }} style={styles.pageImage} />
            <View style={styles.pageInfo}>
                <Text style={styles.pageName}>{item.name}</Text>
                <Text style={styles.pageCategory}>{item.category}</Text>
                <Text style={styles.pageFollowers}>{item.followers}</Text>
            </View>
            <TouchableOpacity
                style={[
                    styles.likeButton,
                    item.isLiked ? styles.likedButton : {},
                ]}
            >
                <Ionicons
                    name={item.isLiked ? "thumbs-up" : "thumbs-up-outline"}
                    size={16}
                    color={item.isLiked ? "#fff" : "#1877F2"}
                />
                <Text
                    style={[
                        styles.likeButtonText,
                        item.isLiked ? styles.likedButtonText : {},
                    ]}
                >
                    {item.isLiked ? "Liked" : "Like"}
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1877F2" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Pages</Text>
                <TouchableOpacity>
                    <Ionicons name="search" size={24} color="#1877F2" />
                </TouchableOpacity>
            </View>

            <View style={styles.tabs}>
                <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                    <Text style={[styles.tabText, styles.activeTabText]}>
                        Your Pages
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>Discover</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>Liked</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.createPageButton}>
                <Ionicons name="add-circle" size={24} color="#1877F2" />
                <Text style={styles.createPageText}>Create New Page</Text>
            </TouchableOpacity>

            <FlatList
                data={pages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
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
    tabs: {
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    tab: {
        paddingVertical: 15,
        marginRight: 20,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: "#1877F2",
    },
    tabText: {
        fontSize: 16,
        color: "#65676B",
    },
    activeTabText: {
        color: "#1877F2",
        fontWeight: "bold",
    },
    createPageButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    createPageText: {
        marginLeft: 10,
        fontSize: 16,
        color: "#1877F2",
        fontWeight: "500",
    },
    listContainer: {
        padding: 10,
    },
    pageItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 10,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    pageImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    pageInfo: {
        flex: 1,
        marginLeft: 12,
    },
    pageName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 2,
    },
    pageCategory: {
        fontSize: 14,
        color: "#65676B",
        marginBottom: 2,
    },
    pageFollowers: {
        fontSize: 12,
        color: "#65676B",
    },
    likeButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E7F3FF",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    likeButtonText: {
        marginLeft: 5,
        color: "#1877F2",
        fontWeight: "500",
    },
    likedButton: {
        backgroundColor: "#1877F2",
    },
    likedButtonText: {
        color: "#fff",
    },
});

export default PagesScreen;
