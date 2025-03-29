import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import {
    getUser,
    getPosts,
    sendFriendRequest,
    acceptFriendRequest,
    removeFriend,
} from "../api/api";
import PostItem from "../components/PostItem";

const UserProfileScreen = ({ route, navigation }) => {
    const { userId } = route.params;
    const { userInfo } = useContext(AuthContext);

    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [friendStatus, setFriendStatus] = useState("none"); // none, requested, friends

    useEffect(() => {
        fetchUserData();
        fetchUserPosts();
    }, [userId]);

    const fetchUserData = async () => {
        try {
            const response = await getUser(userId);
            setUser(response.data.data);

            // Determine friend status
            if (response.data.data.friends.includes(userInfo._id)) {
                setFriendStatus("friends");
            } else if (
                response.data.data.friendRequests.includes(userInfo._id)
            ) {
                setFriendStatus("requested");
            } else {
                setFriendStatus("none");
            }
        } catch (error) {
            console.log("Error fetching user data:", error);
            Alert.alert("Error", "Failed to load user profile");
        } finally {
            setLoading(false);
        }
    };

    const fetchUserPosts = async () => {
        try {
            const response = await getPosts();
            // Filter posts by this user
            const filteredPosts = response.data.data.filter(
                (post) => post.user._id === userId
            );
            setUserPosts(filteredPosts);
        } catch (error) {
            console.log("Error fetching user posts:", error);
        }
    };

    const handleFriendAction = async () => {
        try {
            if (friendStatus === "none") {
                await sendFriendRequest(userId);
                setFriendStatus("requested");
                Alert.alert("Success", "Friend request sent");
            } else if (friendStatus === "requested") {
                await acceptFriendRequest(userId);
                setFriendStatus("friends");
                Alert.alert("Success", "Friend request accepted");
            } else if (friendStatus === "friends") {
                await removeFriend(userId);
                setFriendStatus("none");
                Alert.alert("Success", "Friend removed");
            }
        } catch (error) {
            console.log("Error handling friend action:", error);
            Alert.alert("Error", "Failed to perform action");
        }
    };

    const getFriendButtonText = () => {
        switch (friendStatus) {
            case "none":
                return "Add Friend";
            case "requested":
                return "Accept Request";
            case "friends":
                return "Friends";
            default:
                return "Add Friend";
        }
    };

    const getFriendButtonIcon = () => {
        switch (friendStatus) {
            case "none":
                return "person-add";
            case "requested":
                return "checkmark";
            case "friends":
                return "people";
            default:
                return "person-add";
        }
    };

    const ProfileHeader = () => (
        <View style={styles.profileHeader}>
            <View style={styles.coverPhotoContainer}>
                <Image
                    source={{
                        uri:
                            user?.coverPhoto ||
                            "https://via.placeholder.com/800x300",
                    }}
                    style={styles.coverPhoto}
                />
            </View>

            <View style={styles.profileInfoContainer}>
                <Image
                    source={{
                        uri:
                            user?.profilePicture ||
                            "https://via.placeholder.com/150",
                    }}
                    style={styles.profilePic}
                />

                <Text style={styles.userName}>{user?.name}</Text>
                <Text style={styles.userBio}>{user?.bio || "No bio yet"}</Text>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Ionicons name="people" size={18} color="#65676B" />
                        <Text style={styles.statText}>
                            {user?.friends?.length || 0} Friends
                        </Text>
                    </View>
                    <View style={styles.statItem}>
                        <Ionicons name="location" size={18} color="#65676B" />
                        <Text style={styles.statText}>
                            {user?.location || "No location"}
                        </Text>
                    </View>
                </View>

                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                            friendStatus === "friends"
                                ? styles.friendsButton
                                : styles.primaryButton,
                        ]}
                        onPress={handleFriendAction}
                    >
                        <Ionicons
                            name={getFriendButtonIcon()}
                            size={18}
                            color={
                                friendStatus === "friends" ? "#1877F2" : "#fff"
                            }
                        />
                        <Text
                            style={[
                                friendStatus === "friends"
                                    ? styles.friendsButtonText
                                    : styles.primaryButtonText,
                            ]}
                        >
                            {getFriendButtonText()}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() =>
                            Alert.alert(
                                "Message",
                                `Send a message to ${user?.name}`,
                                [{ text: "OK" }]
                            )
                        }
                    >
                        <Ionicons name="chatbubble" size={18} color="#1877F2" />
                        <Text style={styles.secondaryButtonText}>Message</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, styles.activeTab]}
                    onPress={() =>
                        Alert.alert("Posts", "View all posts from this user")
                    }
                >
                    <Text style={styles.activeTabText}>Posts</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tab}
                    onPress={() =>
                        Alert.alert("About", "View information about this user")
                    }
                >
                    <Text style={styles.tabText}>About</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tab}
                    onPress={() =>
                        Alert.alert("Friends", "View this user's friends")
                    }
                >
                    <Text style={styles.tabText}>Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tab}
                    onPress={() =>
                        Alert.alert("Photos", "View photos from this user")
                    }
                >
                    <Text style={styles.tabText}>Photos</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1877F2" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={userPosts}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <PostItem
                        post={item}
                        onLike={() => {}}
                        onComment={() =>
                            navigation.navigate("PostDetail", {
                                postId: item._id,
                            })
                        }
                        currentUserId={userInfo?._id}
                    />
                )}
                ListHeaderComponent={<ProfileHeader />}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No posts yet</Text>
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    profileHeader: {
        backgroundColor: "#fff",
        marginBottom: 8,
    },
    coverPhotoContainer: {
        height: 200,
    },
    coverPhoto: {
        width: "100%",
        height: "100%",
    },
    profileInfoContainer: {
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: -40,
    },
    profilePic: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 4,
        borderColor: "#fff",
    },
    userName: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
    },
    userBio: {
        fontSize: 16,
        color: "#65676B",
        textAlign: "center",
        marginTop: 5,
        paddingHorizontal: 20,
    },
    statsContainer: {
        flexDirection: "row",
        marginTop: 15,
    },
    statItem: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
    },
    statText: {
        marginLeft: 5,
        color: "#65676B",
    },
    actionsContainer: {
        flexDirection: "row",
        marginTop: 15,
        width: "100%",
        paddingHorizontal: 20,
        justifyContent: "space-between",
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
    },
    primaryButton: {
        backgroundColor: "#1877F2",
    },
    primaryButtonText: {
        color: "#fff",
        fontWeight: "bold",
        marginLeft: 5,
    },
    friendsButton: {
        backgroundColor: "#E4E6EB",
    },
    friendsButtonText: {
        color: "#1877F2",
        fontWeight: "bold",
        marginLeft: 5,
    },
    secondaryButtonText: {
        color: "#1877F2",
        fontWeight: "bold",
        marginLeft: 5,
    },
    tabsContainer: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#E4E6EB",
        marginTop: 15,
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
    emptyContainer: {
        padding: 20,
        alignItems: "center",
    },
    emptyText: {
        color: "#65676B",
        fontSize: 16,
    },
});

export default UserProfileScreen;
