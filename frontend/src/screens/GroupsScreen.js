import React from "react";
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

const GroupsScreen = ({ navigation }) => {
    // Placeholder data for groups
    const groups = [
        {
            id: "1",
            name: "React Native Developers",
            members: "10.2K members",
            image: "https://via.placeholder.com/100",
            isJoined: true,
        },
        {
            id: "2",
            name: "JavaScript Community",
            members: "25.5K members",
            image: "https://via.placeholder.com/100",
            isJoined: true,
        },
        {
            id: "3",
            name: "UI/UX Design Inspiration",
            members: "8.7K members",
            image: "https://via.placeholder.com/100",
            isJoined: false,
        },
        {
            id: "4",
            name: "Mobile App Development",
            members: "15.3K members",
            image: "https://via.placeholder.com/100",
            isJoined: false,
        },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.groupItem}
            onPress={() =>
                Alert.alert(
                    item.name,
                    `View details for ${item.name} group with ${item.members}`,
                    [{ text: "OK" }]
                )
            }
        >
            <Image source={{ uri: item.image }} style={styles.groupImage} />
            <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{item.name}</Text>
                <Text style={styles.groupMembers}>{item.members}</Text>
            </View>
            <TouchableOpacity
                style={[
                    styles.joinButton,
                    item.isJoined ? styles.joinedButton : {},
                ]}
                onPress={() =>
                    Alert.alert(
                        item.isJoined ? "Leave Group" : "Join Group",
                        item.isJoined
                            ? `Are you sure you want to leave ${item.name}?`
                            : `Join ${item.name} group with ${item.members}`,
                        [
                            { text: "Cancel", style: "cancel" },
                            { text: item.isJoined ? "Leave" : "Join" },
                        ]
                    )
                }
            >
                <Text
                    style={[
                        styles.joinButtonText,
                        item.isJoined ? styles.joinedButtonText : {},
                    ]}
                >
                    {item.isJoined ? "Joined" : "Join"}
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
                <Text style={styles.headerTitle}>Groups</Text>
                <TouchableOpacity
                    onPress={() =>
                        Alert.alert(
                            "Search Groups",
                            "Search for groups by name or topic",
                            [{ text: "OK" }]
                        )
                    }
                >
                    <Ionicons name="search" size={24} color="#1877F2" />
                </TouchableOpacity>
            </View>

            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[styles.tab, styles.activeTab]}
                    onPress={() =>
                        Alert.alert("Your Groups", "View groups you've joined")
                    }
                >
                    <Text style={[styles.tabText, styles.activeTabText]}>
                        Your Groups
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tab}
                    onPress={() =>
                        Alert.alert(
                            "Discover Groups",
                            "Find new groups to join"
                        )
                    }
                >
                    <Text style={styles.tabText}>Discover</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.createGroupButton}
                onPress={() =>
                    Alert.alert(
                        "Create New Group",
                        "Start a new group and invite your friends",
                        [
                            { text: "Cancel", style: "cancel" },
                            { text: "Create" },
                        ]
                    )
                }
            >
                <Ionicons name="add-circle" size={24} color="#1877F2" />
                <Text style={styles.createGroupText}>Create New Group</Text>
            </TouchableOpacity>

            <FlatList
                data={groups}
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
    createGroupButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    createGroupText: {
        marginLeft: 10,
        fontSize: 16,
        color: "#1877F2",
        fontWeight: "500",
    },
    listContainer: {
        padding: 10,
    },
    groupItem: {
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
    groupImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    groupInfo: {
        flex: 1,
        marginLeft: 12,
    },
    groupName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    groupMembers: {
        fontSize: 14,
        color: "#65676B",
    },
    joinButton: {
        backgroundColor: "#E7F3FF",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    joinButtonText: {
        color: "#1877F2",
        fontWeight: "500",
    },
    joinedButton: {
        backgroundColor: "#E4E6EB",
    },
    joinedButtonText: {
        color: "#050505",
    },
});

export default GroupsScreen;
