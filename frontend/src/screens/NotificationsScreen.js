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

// Mock data for notifications
const mockNotifications = [
    {
        id: "1",
        type: "like",
        user: {
            id: "101",
            name: "John Doe",
            profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        content: "liked your post",
        time: "2h ago",
        read: false,
    },
    {
        id: "2",
        type: "comment",
        user: {
            id: "102",
            name: "Jane Smith",
            profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        content: 'commented on your post: "Great photo!"',
        time: "5h ago",
        read: false,
    },
    {
        id: "3",
        type: "friend",
        user: {
            id: "103",
            name: "Mike Johnson",
            profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        content: "accepted your friend request",
        time: "1d ago",
        read: true,
    },
    {
        id: "4",
        type: "birthday",
        user: {
            id: "104",
            name: "Sarah Williams",
            profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        content: "has a birthday today",
        time: "Today",
        read: true,
    },
    {
        id: "5",
        type: "tag",
        user: {
            id: "105",
            name: "Alex Brown",
            profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        content: "tagged you in a post",
        time: "2d ago",
        read: true,
    },
];

const NotificationsScreen = ({ navigation }) => {
    const [filter, setFilter] = useState("all");
    const [notifications, setNotifications] = useState(mockNotifications);

    const getNotificationIcon = (type) => {
        switch (type) {
            case "like":
                return (
                    <Ionicons
                        name="heart"
                        size={20}
                        color="#fff"
                        style={[
                            styles.notificationTypeIcon,
                            { backgroundColor: "#E53935" },
                        ]}
                    />
                );
            case "comment":
                return (
                    <Ionicons
                        name="chatbubble"
                        size={20}
                        color="#fff"
                        style={[
                            styles.notificationTypeIcon,
                            { backgroundColor: "#1877F2" },
                        ]}
                    />
                );
            case "friend":
                return (
                    <Ionicons
                        name="person-add"
                        size={20}
                        color="#fff"
                        style={[
                            styles.notificationTypeIcon,
                            { backgroundColor: "#43A047" },
                        ]}
                    />
                );
            case "birthday":
                return (
                    <Ionicons
                        name="gift"
                        size={20}
                        color="#fff"
                        style={[
                            styles.notificationTypeIcon,
                            { backgroundColor: "#FB8C00" },
                        ]}
                    />
                );
            case "tag":
                return (
                    <Ionicons
                        name="pricetag"
                        size={20}
                        color="#fff"
                        style={[
                            styles.notificationTypeIcon,
                            { backgroundColor: "#7B1FA2" },
                        ]}
                    />
                );
            default:
                return (
                    <Ionicons
                        name="notifications"
                        size={20}
                        color="#fff"
                        style={[
                            styles.notificationTypeIcon,
                            { backgroundColor: "#1877F2" },
                        ]}
                    />
                );
        }
    };

    const renderNotificationItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.notificationItem,
                !item.read && styles.unreadNotification,
            ]}
            onPress={() => {
                // Mark notification as read
                const updatedNotifications = notifications.map((notification) =>
                    notification.id === item.id
                        ? { ...notification, read: true }
                        : notification
                );
                setNotifications(updatedNotifications);

                // Navigate based on notification type
                switch (item.type) {
                    case "like":
                    case "comment":
                    case "tag":
                        navigation.navigate("PostDetail", {
                            postId: "mockPostId",
                        });
                        break;
                    case "friend":
                        navigation.navigate("UserProfile", {
                            userId: item.user.id,
                        });
                        break;
                    case "birthday":
                        navigation.navigate("UserProfile", {
                            userId: item.user.id,
                        });
                        break;
                    default:
                        Alert.alert(
                            `${
                                item.type.charAt(0).toUpperCase() +
                                item.type.slice(1)
                            } Notification`,
                            `${item.user.name} ${item.content}`,
                            [{ text: "OK" }]
                        );
                }
            }}
        >
            <View style={styles.notificationContent}>
                <View style={styles.profileContainer}>
                    <Image
                        source={{ uri: item.user.profilePicture }}
                        style={styles.profilePic}
                    />
                    {getNotificationIcon(item.type)}
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.notificationText}>
                        <Text style={styles.userName}>{item.user.name}</Text>{" "}
                        {item.content}
                    </Text>
                    <Text style={styles.timeText}>{item.time}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.moreButton}
                onPress={() =>
                    Alert.alert(
                        "Notification Options",
                        "Choose an action for this notification",
                        [
                            { text: "Cancel", style: "cancel" },
                            { text: "Mark as Read" },
                            { text: "Hide Notification" },
                            { text: "Turn Off Notifications of This Type" },
                        ]
                    )
                }
            >
                <Ionicons
                    name="ellipsis-horizontal"
                    size={20}
                    color="#65676B"
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Notifications</Text>
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() =>
                        Alert.alert(
                            "Search Notifications",
                            "Search for specific notifications",
                            [{ text: "OK" }]
                        )
                    }
                >
                    <Ionicons name="search" size={22} color="#000" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={
                    filter === "all"
                        ? notifications
                        : notifications.filter((item) => !item.read)
                }
                keyExtractor={(item) => item.id}
                renderItem={renderNotificationItem}
                ListHeaderComponent={
                    <View style={styles.filterContainer}>
                        <TouchableOpacity
                            style={[
                                styles.filterButton,
                                filter === "all" && styles.activeFilter,
                            ]}
                            onPress={() => setFilter("all")}
                        >
                            <Text
                                style={
                                    filter === "all"
                                        ? styles.activeFilterText
                                        : styles.filterText
                                }
                            >
                                All
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.filterButton,
                                filter === "unread" && styles.activeFilter,
                            ]}
                            onPress={() => setFilter("unread")}
                        >
                            <Text
                                style={
                                    filter === "unread"
                                        ? styles.activeFilterText
                                        : styles.filterText
                                }
                            >
                                Unread
                            </Text>
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
        backgroundColor: "#F0F2F5",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    searchButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F0F2F5",
        justifyContent: "center",
        alignItems: "center",
    },
    filterContainer: {
        flexDirection: "row",
        padding: 10,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    filterButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 30,
        marginRight: 10,
    },
    activeFilter: {
        backgroundColor: "#E7F3FF",
    },
    filterText: {
        color: "#65676B",
    },
    activeFilterText: {
        color: "#1877F2",
        fontWeight: "bold",
    },
    notificationItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    unreadNotification: {
        backgroundColor: "#E7F3FF",
    },
    notificationContent: {
        flexDirection: "row",
        flex: 1,
    },
    profileContainer: {
        position: "relative",
        marginRight: 15,
    },
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    notificationTypeIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#fff",
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
    },
    notificationText: {
        fontSize: 15,
        lineHeight: 20,
    },
    userName: {
        fontWeight: "bold",
    },
    timeText: {
        color: "#65676B",
        marginTop: 3,
    },
    moreButton: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default NotificationsScreen;
