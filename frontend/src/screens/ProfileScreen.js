import React, { useContext, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { getPosts } from "../api/api";
import PostItem from "../components/PostItem";

const ProfileScreen = ({ navigation }) => {
    const { userInfo, logout } = useContext(AuthContext);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserPosts();
    }, []);

    const fetchUserPosts = async () => {
        try {
            const response = await getPosts();
            // Filter posts by current user
            const filteredPosts = response.data.data.filter(
                (post) => post.user._id === userInfo._id
            );
            setUserPosts(filteredPosts);
        } catch (error) {
            console.log("Error fetching user posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const ProfileHeader = () => (
        <View style={styles.profileHeader}>
            <View style={styles.coverPhotoContainer}>
                <Image
                    source={{
                        uri:
                            userInfo?.coverPhoto ||
                            "https://via.placeholder.com/800x300",
                    }}
                    style={styles.coverPhoto}
                />
                <TouchableOpacity style={styles.editCoverButton}>
                    <Ionicons name="camera" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.profileInfoContainer}>
                <View style={styles.profilePicContainer}>
                    <Image
                        source={{
                            uri:
                                userInfo?.profilePicture ||
                                "https://via.placeholder.com/150",
                        }}
                        style={styles.profilePic}
                    />
                    <TouchableOpacity style={styles.editProfilePicButton}>
                        <Ionicons name="camera" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.userName}>{userInfo?.name}</Text>
                <Text style={styles.userBio}>
                    {userInfo?.bio || "No bio yet"}
                </Text>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Ionicons name="people" size={18} color="#65676B" />
                        <Text style={styles.statText}>
                            {userInfo?.friends?.length || 0} Friends
                        </Text>
                    </View>
                    <View style={styles.statItem}>
                        <Ionicons name="location" size={18} color="#65676B" />
                        <Text style={styles.statText}>
                            {userInfo?.location || "No location"}
                        </Text>
                    </View>
                </View>

                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.primaryButton]}
                        onPress={() => navigation.navigate("EditProfile")}
                    >
                        <Ionicons name="pencil" size={18} color="#fff" />
                        <Text style={styles.primaryButtonText}>
                            Edit Profile
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.secondaryButton]}
                        onPress={logout}
                    >
                        <Ionicons name="log-out" size={18} color="#1877F2" />
                        <Text style={styles.secondaryButtonText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.tabsContainer}>
                <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                    <Text style={styles.activeTabText}>Posts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>About</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
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
        position: "relative",
    },
    coverPhoto: {
        width: "100%",
        height: "100%",
    },
    editCoverButton: {
        position: "absolute",
        right: 10,
        bottom: 10,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    profileInfoContainer: {
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: -40,
    },
    profilePicContainer: {
        position: "relative",
    },
    profilePic: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 4,
        borderColor: "#fff",
    },
    editProfilePicButton: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
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
    secondaryButton: {
        backgroundColor: "#E4E6EB",
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

export default ProfileScreen;
