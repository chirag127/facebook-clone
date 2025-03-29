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
import { DEFAULT_PROFILE_IMAGE } from "../utils/constants";

const NotificationsScreen = ({ navigation }) => {
    const [notifications, setNotifications] = useState([
        {
            id: "1",
            type: "like",
            user: {
                name: "John Doe",
                profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
            },
            content: "liked your post",
            time: "2 minutes ago",
            read: false,
            postId: "post1",
        },
        {
            id: "2",
            type: "comment",
            user: {
                name: "Jane Smith",
                profilePicture:
                    "https://randomuser.me/api/portraits/women/2.jpg",
            },
            content: 'commented on your post: "Great photo!"',
            time: "15 minutes ago",
            read: false,
            postId: "post2",
        },
        {
            id: "3",
            type: "friend_request",
            user: {
                name: "Robert Johnson",
                profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
            },
            content: "sent you a friend request",
            time: "1 hour ago",
            read: true,
            pending: true,
        },
        {
            id: "4",
            type: "friend_accepted",
            user: {
                name: "Sarah Williams",
                profilePicture:
                    "https://randomuser.me/api/portraits/women/4.jpg",
            },
            content: "accepted your friend request",
            time: "2 hours ago",
            read: true,
        },
        {
            id: "5",
            type: "tag",
            user: {
                name: "Michael Brown",
                profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
            },
            content: "tagged you in a post",
            time: "4 hours ago",
            read: true,
            postId: "post3",
        },
        {
            id: "6",
            type: "birthday",
            user: {
                name: "Emily Davis",
                profilePicture:
                    "https://randomuser.me/api/portraits/women/6.jpg",
            },
            content: "has a birthday today",
            time: "6 hours ago",
            read: true,
        },
        {
            id: "7",
            type: "event_invite",
            user: {
                name: "David Wilson",
                profilePicture: "https://randomuser.me/api/portraits/men/7.jpg",
            },
            content: 'invited you to an event: "Summer Party"',
            time: "8 hours ago",
            read: true,
            eventId: "event1",
            pending: true,
        },
        {
            id: "8",
            type: "like",
            user: {
                name: "Sophia Miller",
                profilePicture:
                    "https://randomuser.me/api/portraits/women/8.jpg",
            },
            content: "and 5 others liked your post",
            time: "10 hours ago",
            read: true,
            postId: "post4",
        },
    ]);

    const markAsRead = (notificationId) => {
        setNotifications(
            notifications.map((notification) =>
                notification.id === notificationId
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    const handleAcceptFriendRequest = (notificationId) => {
        Alert.alert("Friend Request Accepted", "You are now friends", [
            { text: "OK" },
        ]);
        setNotifications(
            notifications.map((notification) =>
                notification.id === notificationId
                    ? {
                          ...notification,
                          pending: false,
                          content: "is now your friend",
                      }
                    : notification
            )
        );
    };

    const handleDeclineFriendRequest = (notificationId) => {
        Alert.alert(
            "Friend Request Declined",
            "Friend request has been declined",
            [{ text: "OK" }]
        );
        setNotifications(
            notifications.filter(
                (notification) => notification.id !== notificationId
            )
        );
    };

    const handleNotificationPress = (notification) => {
        markAsRead(notification.id);

        switch (notification.type) {
            case "like":
            case "comment":
            case "tag":
                Alert.alert(
                    "Post Notification",
                    `View the post that ${
                        notification.user.name
                    } ${notification.content.toLowerCase()}`,
                    [
                        { text: "Cancel", style: "cancel" },
                        {
                            text: "View Post",
                            onPress: () =>
                                console.log(
                                    `Viewing post ${notification.postId}`
                                ),
                        },
                    ]
                );
                break;
            case "friend_request":
                // Handled by accept/decline buttons
                break;
            case "friend_accepted":
                Alert.alert(
                    "View Profile",
                    `View ${notification.user.name}'s profile?`,
                    [
                        { text: "Cancel", style: "cancel" },
                        {
                            text: "View Profile",
                            onPress: () =>
                                console.log(
                                    `Viewing profile of ${notification.user.name}`
                                ),
                        },
                    ]
                );
                break;
            case "birthday":
                Alert.alert(
                    "Birthday Notification",
                    `Send a birthday wish to ${notification.user.name}?`,
                    [
                        { text: "Cancel", style: "cancel" },
                        {
                            text: "Send Wish",
                            onPress: () =>
                                Alert.alert(
                                    "Birthday Wish Sent",
                                    `Your birthday wish has been sent to ${notification.user.name}`
                                ),
                        },
                    ]
                );
                break;
            case "event_invite":
                Alert.alert(
                    "Event Invitation",
                    `View details for the event "${
                        notification.content.split('"')[1]
                    }"?`,
                    [
                        { text: "Cancel", style: "cancel" },
                        {
                            text: "View Event",
                            onPress: () =>
                                console.log(
                                    `Viewing event ${notification.eventId}`
                                ),
                        },
                    ]
                );
                break;
            default:
                console.log("Unknown notification type");
        }
    };

    const handleEventResponse = (notificationId, response) => {
        const action =
            response === "accept"
                ? "Going"
                : response === "maybe"
                ? "Maybe"
                : "Declined";
        Alert.alert(
            "Event Response",
            `You marked that you're ${action.toLowerCase()} to this event`,
            [{ text: "OK" }]
        );

        setNotifications(
            notifications.map((notification) =>
                notification.id === notificationId
                    ? { ...notification, pending: false, response: action }
                    : notification
            )
        );
    };

    const renderNotification = ({ item }) => {
        const notificationTypeIcon = () => {
            switch (item.type) {
                case "like":
                    return (
                        <Ionicons name="thumbs-up" size={18} color="#1877F2" />
                    );
                case "comment":
                    return (
                        <Ionicons name="chatbubble" size={18} color="#6C5CE7" />
                    );
                case "friend_request":
                case "friend_accepted":
                    return <Ionicons name="people" size={18} color="#00B894" />;
                case "tag":
                    return (
                        <Ionicons name="pricetag" size={18} color="#FF9F43" />
                    );
                case "birthday":
                    return <Ionicons name="gift" size={18} color="#E84393" />;
                case "event_invite":
                    return (
                        <Ionicons name="calendar" size={18} color="#FD7272" />
                    );
                default:
                    return (
                        <Ionicons
                            name="notifications"
                            size={18}
                            color="#1877F2"
                        />
                    );
            }
        };

        return (
            <TouchableOpacity
                style={[
                    styles.notificationItem,
                    !item.read && styles.unreadNotification,
                ]}
                onPress={() => handleNotificationPress(item)}
            >
                <View style={styles.notificationContent}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={{
                                uri:
                                    item.user.profilePicture ||
                                    DEFAULT_PROFILE_IMAGE,
                            }}
                            style={styles.profileImage}
                        />
                        <View style={styles.notificationTypeIconContainer}>
                            {notificationTypeIcon()}
                        </View>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.notificationText}>
                            <Text style={styles.userName}>
                                {item.user.name}
                            </Text>{" "}
                            {item.content}
                        </Text>
                        <Text style={styles.timeText}>{item.time}</Text>

                        {item.type === "friend_request" && item.pending && (
                            <View style={styles.actionButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.actionButton,
                                        styles.acceptButton,
                                    ]}
                                    onPress={() =>
                                        handleAcceptFriendRequest(item.id)
                                    }
                                >
                                    <Text style={styles.actionButtonText}>
                                        Accept
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.actionButton,
                                        styles.declineButton,
                                    ]}
                                    onPress={() =>
                                        handleDeclineFriendRequest(item.id)
                                    }
                                >
                                    <Text style={styles.declineButtonText}>
                                        Decline
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {item.type === "event_invite" && item.pending && (
                            <View style={styles.actionButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.actionButton,
                                        styles.acceptButton,
                                    ]}
                                    onPress={() =>
                                        handleEventResponse(item.id, "accept")
                                    }
                                >
                                    <Text style={styles.actionButtonText}>
                                        Going
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.actionButton,
                                        styles.maybeButton,
                                    ]}
                                    onPress={() =>
                                        handleEventResponse(item.id, "maybe")
                                    }
                                >
                                    <Text style={styles.maybeButtonText}>
                                        Maybe
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.actionButton,
                                        styles.declineButton,
                                    ]}
                                    onPress={() =>
                                        handleEventResponse(item.id, "decline")
                                    }
                                >
                                    <Text style={styles.declineButtonText}>
                                        Decline
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    <TouchableOpacity
                        style={styles.moreButton}
                        onPress={() =>
                            Alert.alert(
                                "Options",
                                "What would you like to do?",
                                [
                                    {
                                        text: "Mark as read",
                                        onPress: () => markAsRead(item.id),
                                    },
                                    {
                                        text: "Remove this notification",
                                        onPress: () =>
                                            setNotifications(
                                                notifications.filter(
                                                    (n) => n.id !== item.id
                                                )
                                            ),
                                    },
                                    {
                                        text: "Cancel",
                                        style: "cancel",
                                    },
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
                </View>
            </TouchableOpacity>
        );
    };

    const markAllAsRead = () => {
        setNotifications(
            notifications.map((notification) => ({
                ...notification,
                read: true,
            }))
        );
        Alert.alert("Success", "All notifications marked as read");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Notifications</Text>
                <TouchableOpacity onPress={markAllAsRead}>
                    <Text style={styles.markAllText}>Mark all as read</Text>
                </TouchableOpacity>
            </View>

            {notifications.length > 0 ? (
                <FlatList
                    data={notifications}
                    renderItem={renderNotification}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Ionicons
                        name="notifications-off"
                        size={60}
                        color="#CCD0D5"
                    />
                    <Text style={styles.emptyText}>No Notifications</Text>
                    <Text style={styles.emptySubtext}>
                        When you get notifications, they'll show up here
                    </Text>
                </View>
            )}
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
        padding: 16,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    markAllText: {
        color: "#1877F2",
        fontWeight: "500",
    },
    notificationItem: {
        padding: 16,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    unreadNotification: {
        backgroundColor: "#E7F3FF",
    },
    notificationContent: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    profileImageContainer: {
        position: "relative",
        marginRight: 12,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    notificationTypeIconContainer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#fff",
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E4E6EB",
    },
    textContainer: {
        flex: 1,
    },
    notificationText: {
        fontSize: 14,
        color: "#1C1E21",
        marginBottom: 4,
    },
    userName: {
        fontWeight: "bold",
    },
    timeText: {
        fontSize: 12,
        color: "#65676B",
    },
    actionButtons: {
        flexDirection: "row",
        marginTop: 10,
    },
    actionButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
        marginRight: 8,
    },
    acceptButton: {
        backgroundColor: "#1877F2",
    },
    maybeButton: {
        backgroundColor: "#E4E6EB",
    },
    declineButton: {
        backgroundColor: "#E4E6EB",
    },
    actionButtonText: {
        color: "#fff",
        fontWeight: "500",
    },
    maybeButtonText: {
        color: "#1C1E21",
        fontWeight: "500",
    },
    declineButtonText: {
        color: "#1C1E21",
        fontWeight: "500",
    },
    moreButton: {
        padding: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1C1E21",
        marginTop: 16,
    },
    emptySubtext: {
        fontSize: 14,
        color: "#65676B",
        textAlign: "center",
        marginTop: 8,
    },
});

export default NotificationsScreen;
