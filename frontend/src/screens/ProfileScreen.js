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
import { getPosts, likePost, unlikePost } from "../api/api";
import PostItem from "../components/PostItem";

const ProfileScreen = ({ navigation }) => {
    const { userInfo, logout } = useContext(AuthContext);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("posts");

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

    const handleLikePost = async (postId, isLiked) => {
        try {
            if (isLiked) {
                await unlikePost(postId);
            } else {
                await likePost(postId);
            }
            fetchUserPosts();
        } catch (error) {
            console.log("Error liking/unliking post:", error);
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
                    {userInfo?.bio ||
                        "Add a short bio to tell people more about yourself"}
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
                            {userInfo?.location || "Add location"}
                        </Text>
                    </View>
                    <View style={styles.statItem}>
                        <Ionicons name="briefcase" size={18} color="#65676B" />
                        <Text style={styles.statText}>
                            {userInfo?.workplace || "Add workplace"}
                        </Text>
                    </View>
                </View>

                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.primaryButton]}
                        onPress={() => navigation.navigate("EditProfile")}
                    >
                        <Ionicons name="add-circle" size={18} color="#fff" />
                        <Text style={styles.primaryButtonText}>
                            Add to Story
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.secondaryButton]}
                        onPress={() => navigation.navigate("EditProfile")}
                    >
                        <Ionicons name="pencil" size={18} color="#1877F2" />
                        <Text style={styles.secondaryButtonText}>
                            Edit Profile
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.moreButton}>
                        <Ionicons
                            name="ellipsis-horizontal"
                            size={20}
                            color="#65676B"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === "posts" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("posts")}
                >
                    <Text
                        style={
                            activeTab === "posts"
                                ? styles.activeTabText
                                : styles.tabText
                        }
                    >
                        Posts
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === "about" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("about")}
                >
                    <Text
                        style={
                            activeTab === "about"
                                ? styles.activeTabText
                                : styles.tabText
                        }
                    >
                        About
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === "friends" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("friends")}
                >
                    <Text
                        style={
                            activeTab === "friends"
                                ? styles.activeTabText
                                : styles.tabText
                        }
                    >
                        Friends
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === "photos" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("photos")}
                >
                    <Text
                        style={
                            activeTab === "photos"
                                ? styles.activeTabText
                                : styles.tabText
                        }
                    >
                        Photos
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderAboutTab = () => (
        <View style={styles.aboutContainer}>
            <View style={styles.aboutSection}>
                <Text style={styles.aboutSectionTitle}>About</Text>
                <TouchableOpacity style={styles.editSectionButton}>
                    <Ionicons name="pencil" size={16} color="#1877F2" />
                </TouchableOpacity>
            </View>
            <View style={styles.aboutItem}>
                <Ionicons
                    name="briefcase"
                    size={22}
                    color="#65676B"
                    style={styles.aboutIcon}
                />
                <Text style={styles.aboutText}>
                    Works at {userInfo?.workplace || "Add workplace"}
                </Text>
            </View>
            <View style={styles.aboutItem}>
                <Ionicons
                    name="school"
                    size={22}
                    color="#65676B"
                    style={styles.aboutIcon}
                />
                <Text style={styles.aboutText}>
                    Studied at {userInfo?.education || "Add education"}
                </Text>
            </View>
            <View style={styles.aboutItem}>
                <Ionicons
                    name="home"
                    size={22}
                    color="#65676B"
                    style={styles.aboutIcon}
                />
                <Text style={styles.aboutText}>
                    Lives in {userInfo?.location || "Add current city"}
                </Text>
            </View>
            <View style={styles.aboutItem}>
                <Ionicons
                    name="heart"
                    size={22}
                    color="#65676B"
                    style={styles.aboutIcon}
                />
                <Text style={styles.aboutText}>
                    {userInfo?.relationship || "Add relationship status"}
                </Text>
            </View>
        </View>
    );

    const renderFriendsTab = () => (
        <View style={styles.friendsContainer}>
            <View style={styles.friendsHeader}>
                <Text style={styles.friendsTitle}>Friends</Text>
                <TouchableOpacity>
                    <Text style={styles.findFriendsText}>Find Friends</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.friendsSubtitle}>
                {userInfo?.friends?.length || 0} friends
            </Text>
            <View style={styles.emptyFriends}>
                <Ionicons name="people" size={50} color="#CCD0D5" />
                <Text style={styles.emptyFriendsText}>No friends to show</Text>
            </View>
        </View>
    );

    const renderPhotosTab = () => (
        <View style={styles.photosContainer}>
            <View style={styles.photosHeader}>
                <Text style={styles.photosTitle}>Photos</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAllPhotosText}>See All Photos</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.emptyPhotos}>
                <Ionicons name="images" size={50} color="#CCD0D5" />
                <Text style={styles.emptyPhotosText}>No photos to show</Text>
            </View>
        </View>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case "about":
                return renderAboutTab();
            case "friends":
                return renderFriendsTab();
            case "photos":
                return renderPhotosTab();
            default:
                return (
                    <FlatList
                        data={userPosts}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <PostItem
                                post={item}
                                onLike={(isLiked) =>
                                    handleLikePost(item._id, isLiked)
                                }
                                onComment={() =>
                                    navigation.navigate("PostDetail", {
                                        postId: item._id,
                                    })
                                }
                                onProfilePress={() => {}}
                                currentUserId={userInfo?._id}
                            />
                        )}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Ionicons
                                    name="newspaper"
                                    size={50}
                                    color="#CCD0D5"
                                />
                                <Text style={styles.emptyText}>
                                    No posts yet
                                </Text>
                                <TouchableOpacity
                                    style={styles.createPostButton}
                                >
                                    <Text style={styles.createPostText}>
                                        Create Post
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        }
                    />
                );
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1877F2" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ProfileHeader />
            {renderTabContent()}
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
        color: "#1c1e21",
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
        paddingHorizontal: 16,
        marginBottom: 15,
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        flex: 1,
    },
    primaryButton: {
        backgroundColor: "#1877F2",
        marginRight: 8,
    },
    primaryButtonText: {
        color: "#fff",
        fontWeight: "500",
        marginLeft: 5,
    },
    secondaryButton: {
        backgroundColor: "#E4E6EB",
        marginRight: 8,
    },
    secondaryButtonText: {
        color: "#1877F2",
        fontWeight: "500",
        marginLeft: 5,
    },
    moreButton: {
        backgroundColor: "#E4E6EB",
        height: 36,
        width: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    tabsContainer: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#E4E6EB",
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
    emptyContainer: {
        backgroundColor: "#fff",
        padding: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
    },
    emptyText: {
        fontSize: 18,
        color: "#65676B",
        marginTop: 10,
    },
    createPostButton: {
        backgroundColor: "#1877F2",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginTop: 15,
    },
    createPostText: {
        color: "#fff",
        fontWeight: "500",
    },
    aboutContainer: {
        backgroundColor: "#fff",
        padding: 15,
        marginTop: 8,
    },
    aboutSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    aboutSectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1c1e21",
    },
    editSectionButton: {
        padding: 5,
    },
    aboutItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    aboutIcon: {
        marginRight: 10,
    },
    aboutText: {
        fontSize: 16,
        color: "#1c1e21",
    },
    friendsContainer: {
        backgroundColor: "#fff",
        padding: 15,
        marginTop: 8,
    },
    friendsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    friendsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1c1e21",
    },
    findFriendsText: {
        color: "#1877F2",
        fontWeight: "500",
    },
    friendsSubtitle: {
        color: "#65676B",
        marginTop: 5,
        marginBottom: 15,
    },
    emptyFriends: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 30,
    },
    emptyFriendsText: {
        fontSize: 16,
        color: "#65676B",
        marginTop: 10,
    },
    photosContainer: {
        backgroundColor: "#fff",
        padding: 15,
        marginTop: 8,
    },
    photosHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    photosTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1c1e21",
    },
    viewAllPhotosText: {
        color: "#1877F2",
        fontWeight: "500",
    },
    emptyPhotos: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 30,
    },
    emptyPhotosText: {
        fontSize: 16,
        color: "#65676B",
        marginTop: 10,
    },
});

export default ProfileScreen;
