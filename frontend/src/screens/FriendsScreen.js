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
    Modal,
    ScrollView,
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
    const [suggestedFriends, setSuggestedFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === "friends") {
                const friendsResponse = await getFriends();
                setFriends(friendsResponse.data.data || []);
                // TODO: Implement API for suggested friends if available
                setSuggestedFriends([]); // Clear suggested for now
            } else if (activeTab === "requests") {
                const requestsResponse = await getFriendRequests();
                setFriendRequests(requestsResponse.data.data || []);
            } else if (activeTab === "suggested") {
                // TODO: Implement API for suggested friends if available
                setSuggestedFriends([]); // Clear suggested for now
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
            Alert.alert("Success", "Friend request accepted!");
            // Refetch data to update lists
            fetchData();
        } catch (error) {
            console.log("Error accepting friend request:", error);
        }
    };

    const handleRejectRequest = async (userId) => {
        try {
            Alert.alert(
                "Delete Request",
                "Are you sure you want to delete this friend request?",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Delete",
                        style: "destructive",
                        onPress: async () => {
                            await rejectFriendRequest(userId);
                            Alert.alert(
                                "Success",
                                "Friend request deleted"
                            );
                            // Refetch data to update lists
                            fetchData();
                        }
                    }
                ]
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
                        onPress: async () => {
                            await removeFriend(userId);
                            Alert.alert(
                                "Success",
                                "Friend removed successfully"
                            );
                            // Close modal if open
                            if (showProfileModal && selectedFriend?._id === userId) {
                                setShowProfileModal(false);
                            }
                            // Refetch data to update lists
                            fetchData();
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
                onPress: () => {
                    // Show active tab for suggested friends
                    setActiveTab("suggested");
                },
            },
        ]);
    };

    const handleSendFriendRequest = (userId) => {
        // Find the suggested friend
        const friend = suggestedFriends.find(f => f._id === userId);
        if (friend) {
            Alert.alert(
                "Friend Request Sent",
                `Your friend request to ${friend.name} has been sent!`
            );
            // Remove from suggestions
            setSuggestedFriends(suggestedFriends.filter(f => f._id !== userId));
        }
    };

    const handleViewFriendProfile = (friend) => {
        setSelectedFriend(friend);
        setShowProfileModal(true);
    };

    const filteredFriends = searchText
        ? friends.filter(friend =>
            friend.name.toLowerCase().includes(searchText.toLowerCase()))
        : friends;

    const filteredRequests = searchText
        ? friendRequests.filter(request =>
            request.name.toLowerCase().includes(searchText.toLowerCase()))
        : friendRequests;

    const filteredSuggestions = searchText
        ? suggestedFriends.filter(suggestion =>
            suggestion.name.toLowerCase().includes(searchText.toLowerCase()))
        : suggestedFriends;

    const renderFriendItem = ({ item }) => (
        <TouchableOpacity
            style={styles.friendItem}
            onPress={() => handleViewFriendProfile(item)}
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
                    onPress={() => {
                        Alert.alert(
                            "Message",
                            `Opening chat with ${item.name}`,
                            [
                                { text: "Cancel", style: "cancel" },
                                {
                                    text: "Open Chat",
                                    onPress: () => navigation.navigate("Messenger", { contactId: item._id })
                                }
                            ]
                        );
                    }}
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
                onPress={() => handleViewFriendProfile(item)}
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

    const renderSuggestedItem = ({ item }) => (
        <View style={styles.requestItem}>
            <TouchableOpacity
                style={styles.requestProfile}
                onPress={() => handleViewFriendProfile(item)}
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
                    onPress={() => handleSendFriendRequest(item._id)}
                >
                    <Text style={styles.acceptButtonText}>Add Friend</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.requestButton, styles.rejectButton]}
                    onPress={() => setSuggestedFriends(suggestedFriends.filter(f => f._id !== item._id))}
                >
                    <Text style={styles.rejectButtonText}>Remove</Text>
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
                        autoFocus
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
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === "suggested" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("suggested")}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === "suggested" && styles.activeTabText,
                        ]}
                    >
                        Suggested
                    </Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#1877F2" />
                </View>
            ) : (
                <FlatList
                    data={
                        activeTab === "friends"
                            ? filteredFriends
                            : activeTab === "requests"
                                ? filteredRequests
                                : filteredSuggestions
                    }
                    keyExtractor={(item) => item._id}
                    renderItem={
                        activeTab === "friends"
                            ? renderFriendItem
                            : activeTab === "requests"
                                ? renderRequestItem
                                : renderSuggestedItem
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
                                        : activeTab === "requests"
                                            ? "person-add"
                                            : "search"
                                }
                                size={50}
                                color="#CCD0D5"
                            />
                            <Text style={styles.emptyTitle}>
                                {activeTab === "friends"
                                    ? "No Friends Found"
                                    : activeTab === "requests"
                                        ? "No Friend Requests"
                                        : "No Suggestions Found"}
                            </Text>
                            <Text style={styles.emptyText}>
                                {activeTab === "friends"
                                    ? searchText
                                        ? `No friends matching "${searchText}"`
                                        : "You don't have any friends yet"
                                    : activeTab === "requests"
                                        ? searchText
                                            ? `No requests matching "${searchText}"`
                                            : "You don't have any friend requests"
                                        : searchText
                                            ? `No suggestions matching "${searchText}"`
                                            : "We don't have any friend suggestions for you right now"}
                            </Text>
                            {activeTab === "friends" && !searchText && (
                                <TouchableOpacity
                                    style={styles.emptyButton}
                                    onPress={handleAddFriend}
                                >
                                    <Text style={styles.emptyButtonText}>
                                        Find Friends
                                    </Text>
                                </TouchableOpacity>
                            )}
                            {searchText && (
                                <TouchableOpacity
                                    style={styles.emptyButton}
                                    onPress={() => setSearchText("")}
                                >
                                    <Text style={styles.emptyButtonText}>
                                        Clear Search
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    }
                />
            )}

            {/* Friend Profile Modal */}
            <Modal
                visible={showProfileModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowProfileModal(false)}
            >
                {selectedFriend && (
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>{selectedFriend.name}</Text>
                                <TouchableOpacity
                                    onPress={() => setShowProfileModal(false)}
                                    style={styles.closeButton}
                                >
                                    <Ionicons name="close" size={24} color="#65676B" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView style={styles.modalBody}>
                                <View style={styles.profileImageContainer}>
                                    <Image
                                        source={{ uri: selectedFriend.profilePicture || DEFAULT_PROFILE_IMAGE }}
                                        style={styles.profileImage}
                                    />
                                </View>

                                <View style={styles.profileInfo}>
                                    <View style={styles.infoItem}>
                                        <Ionicons name="location" size={20} color="#65676B" />
                                        <Text style={styles.infoText}>Lives in {selectedFriend.location}</Text>
                                    </View>

                                    <View style={styles.infoItem}>
                                        <Ionicons name="briefcase" size={20} color="#65676B" />
                                        <Text style={styles.infoText}>{selectedFriend.occupation}</Text>
                                    </View>

                                    <View style={styles.infoItem}>
                                        <Ionicons name="school" size={20} color="#65676B" />
                                        <Text style={styles.infoText}>{selectedFriend.education}</Text>
                                    </View>

                                    <View style={styles.infoItem}>
                                        <Ionicons name="people" size={20} color="#65676B" />
                                        <Text style={styles.infoText}>{selectedFriend.mutualFriends} mutual friends</Text>
                                    </View>
                                </View>

                                <View style={styles.actionButtonsContainer}>
                                    <TouchableOpacity
                                        style={styles.profileActionButton}
                                        onPress={() => {
                                            setShowProfileModal(false);
                                            navigation.navigate("UserProfile", { userId: selectedFriend._id });
                                        }}
                                    >
                                        <Ionicons name="person" size={20} color="#fff" />
                                        <Text style={styles.profileActionText}>View Profile</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.profileActionButton}
                                        onPress={() => {
                                            setShowProfileModal(false);
                                            navigation.navigate("Messenger", { contactId: selectedFriend._id });
                                        }}
                                    >
                                        <Ionicons name="chatbubble" size={20} color="#fff" />
                                        <Text style={styles.profileActionText}>Message</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.profileActionButton, styles.removeButton]}
                                        onPress={() => {
                                            handleRemoveFriend(selectedFriend._id);
                                        }}
                                    >
                                        <Ionicons name="person-remove" size={20} color="#fff" />
                                        <Text style={styles.profileActionText}>Remove</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                )}
            </Modal>
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
        marginTop: 30,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1c1e21",
        marginTop: 10,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 16,
        color: "#65676B",
        textAlign: "center",
        marginTop: 10,
        marginBottom: 15,
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
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: "80%",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1c1e21",
    },
    closeButton: {
        padding: 5,
    },
    modalBody: {
        flex: 1,
    },
    profileImageContainer: {
        alignItems: "center",
        paddingVertical: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    profileInfo: {
        padding: 15,
    },
    infoItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    infoText: {
        fontSize: 16,
        color: "#1c1e21",
        marginLeft: 10,
    },
    actionButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: "#E4E6EB",
    },
    profileActionButton: {
        backgroundColor: "#1877F2",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 6,
        minWidth: 100,
    },
    profileActionText: {
        color: "#fff",
        fontWeight: "500",
        marginLeft: 5,
    },
    removeButton: {
        backgroundColor: "#FA383E",
    },
});

export default FriendsScreen;
