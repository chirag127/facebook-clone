import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert,
    TextInput,
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
import { DEFAULT_PROFILE_IMAGE } from "../utils/constants";

const FriendsScreen = ({ navigation }) => {
    const { userInfo } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("friends");
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Mock data for demonstration - in a real app this would use the API
            if (activeTab === "friends") {
                // Mock friends
                const mockFriends = [
                    {
                        _id: "1",
                        name: "John Doe",
                        profilePicture:
                            "https://randomuser.me/api/portraits/men/1.jpg",
                        mutualFriends: 5,
                    },
                    {
                        _id: "2",
                        name: "Jane Smith",
                        profilePicture:
                            "https://randomuser.me/api/portraits/women/2.jpg",
                        mutualFriends: 3,
                    },
                    {
                        _id: "3",
                        name: "Robert Johnson",
                        profilePicture:
                            "https://randomuser.me/api/portraits/men/3.jpg",
                        mutualFriends: 8,
                    },
                ];
                setFriends(mockFriends);
            } else {
                // Mock friend requests
                const mockRequests = [
                    {
                        _id: "4",
                        name: "Sarah Williams",
                        profilePicture:
                            "https://randomuser.me/api/portraits/women/4.jpg",
                        mutualFriends: 2,
                    },
                    {
                        _id: "5",
                        name: "Michael Brown",
                        profilePicture:
                            "https://randomuser.me/api/portraits/men/5.jpg",
                        mutualFriends: 4,
                    },
                ];
                setFriendRequests(mockRequests);
            }
        } catch (error) {
            console.log(`Error fetching ${activeTab}:`, error);
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptRequest = async (userId) => {
        try {
            // In a real app, this would call the API
            // await acceptFriendRequest(userId);

            // For demo - simply remove from requests list
            Alert.alert("Friend Request Accepted", "You are now friends!");
            setFriendRequests(
                friendRequests.filter((request) => request._id !== userId)
            );

            // Add to friends list (simulate API response)
            const acceptedFriend = friendRequests.find(
                (request) => request._id === userId
            );
            if (acceptedFriend) {
                setFriends([...friends, acceptedFriend]);
            }
        } catch (error) {
            console.log("Error accepting friend request:", error);
        }
    };

    const handleRejectRequest = async (userId) => {
        try {
            // In a real app, this would call the API
            // await rejectFriendRequest(userId);

            Alert.alert(
                "Friend Request Deleted",
                "The friend request has been removed"
            );
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
            Alert.alert(
                "Remove Friend",
                "Are you sure you want to remove this friend?",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Remove",
                        style: "destructive",
                        onPress: () => {
                            // In a real app, this would call the API
                            // await removeFriend(userId);

                            // Remove from friends list
                            setFriends(
                                friends.filter(
                                    (friend) => friend._id !== userId
                                )
                            );
                            Alert.alert(
                                "Friend Removed",
                                "This person has been removed from your friends list"
                            );
                        },
                    },
                ]
            );
        } catch (error) {
            console.log("Error removing friend:", error);
        }
    };

    const handleAddFriend = () => {
        Alert.alert("Add Friends", "Find people you may know", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Find Friends",
                onPress: () => console.log("Finding friends"),
            },
        ]);
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
                    uri: item.profilePicture || DEFAULT_PROFILE_IMAGE,
                }}
                style={styles.profilePic}
            />
            <View style={styles.friendInfo}>
                <Text style={styles.friendName}>{item.name}</Text>
                <Text style={styles.mutualFriends}>
                    {item.mutualFriends} mutual friends
                </Text>
            </View>
            <View style={styles.friendActions}>
                <TouchableOpacity
                    style={styles.messageButton}
                    onPress={() =>
                        Alert.alert("Message", `Send a message to ${item.name}`)
                    }
                >
                    <Ionicons
                        name="chatbubble-outline"
                        size={20}
                        color="#1877F2"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleRemoveFriend(item._id)}
                >
                    <Ionicons name="person-remove" size={20} color="#65676B" />
                </TouchableOpacity>
            </View>
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
                        uri: item.profilePicture || DEFAULT_PROFILE_IMAGE,
                    }}
                    style={styles.profilePic}
                />
                <View style={styles.friendInfo}>
                    <Text style={styles.friendName}>{item.name}</Text>
                    <Text style={styles.mutualFriends}>
                        {item.mutualFriends} mutual friends
                    </Text>
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
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => setSearchVisible(!searchVisible)}
                >
                    <Ionicons name="search" size={22} color="#000" />
                </TouchableOpacity>
            </View>

            {searchVisible && (
                <View style={styles.searchContainer}>
                    <Ionicons
                        name="search"
                        size={20}
                        color="#65676B"
                        style={styles.searchIcon}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search friends"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    {searchText.length > 0 && (
                        <TouchableOpacity
                            style={styles.clearButton}
                            onPress={() => setSearchText("")}
                        >
                            <Ionicons
                                name="close-circle"
                                size={20}
                                color="#65676B"
                            />
                        </TouchableOpacity>
                    )}
                </View>
            )}

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
                    ListHeaderComponent={
                        activeTab === "friends" && (
                            <TouchableOpacity
                                style={styles.addFriendsCard}
                                onPress={handleAddFriend}
                            >
                                <View style={styles.addFriendsIcon}>
                                    <Ionicons
                                        name="person-add"
                                        size={24}
                                        color="#fff"
                                    />
                                </View>
                                <Text style={styles.addFriendsText}>
                                    Find Friends
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Ionicons
                                name={
                                    activeTab === "friends"
                                        ? "people"
                                        : "person-add"
                                }
                                size={50}
                                color="#CCD0D5"
                            />
                            <Text style={styles.emptyText}>
                                {activeTab === "friends"
                                    ? "You don't have any friends yet"
                                    : "You don't have any friend requests"}
                            </Text>
                            {activeTab === "friends" && (
                                <TouchableOpacity
                                    style={styles.emptyButton}
                                    onPress={handleAddFriend}
                                >
                                    <Text style={styles.emptyButtonText}>
                                        Find Friends
                                    </Text>
                                </TouchableOpacity>
                            )}
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
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1c1e21",
    },
    searchButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F0F2F5",
        justifyContent: "center",
        alignItems: "center",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0F2F5",
        borderRadius: 20,
        paddingHorizontal: 10,
        margin: 10,
        height: 40,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    clearButton: {
        padding: 5,
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
        borderBottomWidth: 3,
        borderBottomColor: "#1877F2",
    },
    tabText: {
        color: "#65676B",
        fontWeight: "500",
    },
    activeTabText: {
        color: "#1877F2",
        fontWeight: "500",
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
        padding: 50,
    },
    emptyText: {
        fontSize: 16,
        color: "#65676B",
        textAlign: "center",
        marginTop: 10,
    },
    emptyButton: {
        backgroundColor: "#1877F2",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginTop: 15,
    },
    emptyButtonText: {
        color: "#fff",
        fontWeight: "500",
    },
    addFriendsCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        marginHorizontal: 10,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    addFriendsIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#1877F2",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    addFriendsText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#1877F2",
    },
    friendItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    friendInfo: {
        flex: 1,
        marginLeft: 10,
    },
    friendName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1c1e21",
    },
    mutualFriends: {
        fontSize: 14,
        color: "#65676B",
    },
    friendActions: {
        flexDirection: "row",
        alignItems: "center",
    },
    messageButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#E4E6EB",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    actionButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#E4E6EB",
        justifyContent: "center",
        alignItems: "center",
    },
    requestItem: {
        backgroundColor: "#fff",
        padding: 12,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    requestProfile: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    requestActions: {
        flexDirection: "row",
    },
    requestButton: {
        flex: 1,
        borderRadius: 6,
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    acceptButton: {
        backgroundColor: "#1877F2",
        marginRight: 8,
    },
    acceptButtonText: {
        color: "#fff",
        fontWeight: "500",
    },
    rejectButton: {
        backgroundColor: "#E4E6EB",
    },
    rejectButtonText: {
        color: "#1c1e21",
        fontWeight: "500",
    },
});

export default FriendsScreen;
