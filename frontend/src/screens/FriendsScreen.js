import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import {
    getFriends,
    getFriendRequests,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
} from "../api/api";

const FriendsScreen = ({ navigation }) => {
    const { userInfo } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("friends");
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === "friends") {
                const response = await getFriends();
                setFriends(response.data.data);
            } else {
                const response = await getFriendRequests();
                setFriendRequests(response.data.data);
            }
        } catch (error) {
            console.log(`Error fetching ${activeTab}:`, error);
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptRequest = async (userId) => {
        try {
            await acceptFriendRequest(userId);
            // Remove from requests list
            setFriendRequests(
                friendRequests.filter((request) => request._id !== userId)
            );
            // Refresh friends list if we're viewing it
            if (activeTab === "friends") {
                fetchData();
            }
        } catch (error) {
            console.log("Error accepting friend request:", error);
        }
    };

    const handleRejectRequest = async (userId) => {
        try {
            await rejectFriendRequest(userId);
            // Remove from requests list
            setFriendRequests(
                friendRequests.filter((request) => request._id !== userId)
            );
        } catch (error) {
            console.log("Error rejecting friend request:", error);
        }
    };

    const handleRemoveFriend = async (userId) => {
        try {
            await removeFriend(userId);
            // Remove from friends list
            setFriends(friends.filter((friend) => friend._id !== userId));
        } catch (error) {
            console.log("Error removing friend:", error);
        }
    };

    const renderFriendItem = ({ item }) => (
        <TouchableOpacity
            style={styles.friendItem}
            onPress={() =>
                navigation.navigate("UserProfile", { userId: item._id })
            }
        >
            <Image
                source={{
                    uri:
                        item.profilePicture ||
                        "https://via.placeholder.com/150",
                }}
                style={styles.profilePic}
            />
            <View style={styles.friendInfo}>
                <Text style={styles.friendName}>{item.name}</Text>
                <Text style={styles.mutualFriends}>5 mutual friends</Text>
            </View>
            <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleRemoveFriend(item._id)}
            >
                <Ionicons name="person-remove" size={20} color="#65676B" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    const renderRequestItem = ({ item }) => (
        <View style={styles.requestItem}>
            <TouchableOpacity
                style={styles.requestProfile}
                onPress={() =>
                    navigation.navigate("UserProfile", { userId: item._id })
                }
            >
                <Image
                    source={{
                        uri:
                            item.profilePicture ||
                            "https://via.placeholder.com/150",
                    }}
                    style={styles.profilePic}
                />
                <View style={styles.friendInfo}>
                    <Text style={styles.friendName}>{item.name}</Text>
                    <Text style={styles.mutualFriends}>5 mutual friends</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.requestActions}>
                <TouchableOpacity
                    style={[styles.requestButton, styles.acceptButton]}
                    onPress={() => handleAcceptRequest(item._id)}
                >
                    <Text style={styles.acceptButtonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.requestButton, styles.rejectButton]}
                    onPress={() => handleRejectRequest(item._id)}
                >
                    <Text style={styles.rejectButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Friends</Text>
                <TouchableOpacity style={styles.searchButton}>
                    <Ionicons name="search" size={22} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === "friends" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("friends")}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === "friends" && styles.activeTabText,
                        ]}
                    >
                        Your Friends
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === "requests" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("requests")}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === "requests" && styles.activeTabText,
                        ]}
                    >
                        Requests
                        {friendRequests.length > 0 && (
                            <Text style={styles.requestCount}>
                                {" "}
                                ({friendRequests.length})
                            </Text>
                        )}
                    </Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#1877F2" />
                </View>
            ) : (
                <FlatList
                    data={activeTab === "friends" ? friends : friendRequests}
                    keyExtractor={(item) => item._id}
                    renderItem={
                        activeTab === "friends"
                            ? renderFriendItem
                            : renderRequestItem
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>
                                {activeTab === "friends"
                                    ? "You don't have any friends yet"
                                    : "You don't have any friend requests"}
                            </Text>
                        </View>
                    }
                />
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
    tabs: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    tab: {
        flex: 1,
        paddingVertical: 15,
        alignItems: "center",
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: "#1877F2",
    },
    tabText: {
        color: "#65676B",
        fontWeight: "500",
    },
    activeTabText: {
        color: "#1877F2",
        fontWeight: "bold",
    },
    requestCount: {
        color: "#1877F2",
        fontWeight: "bold",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        marginTop: 50,
    },
    emptyText: {
        color: "#65676B",
        fontSize: 16,
        textAlign: "center",
    },
    friendItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    friendInfo: {
        flex: 1,
        marginLeft: 15,
    },
    friendName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    mutualFriends: {
        color: "#65676B",
        marginTop: 3,
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F0F2F5",
        justifyContent: "center",
        alignItems: "center",
    },
    requestItem: {
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    requestProfile: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    requestActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 75,
    },
    requestButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        flex: 1,
        alignItems: "center",
        marginHorizontal: 5,
    },
    acceptButton: {
        backgroundColor: "#1877F2",
    },
    acceptButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    rejectButton: {
        backgroundColor: "#E4E6EB",
    },
    rejectButtonText: {
        color: "#000",
        fontWeight: "bold",
    },
});

export default FriendsScreen;
