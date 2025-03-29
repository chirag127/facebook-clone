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
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../context/AuthContext";
import {
    getPosts,
    likePost,
    unlikePost,
    updateProfilePicture,
    updateCoverPhoto,
} from "../api/api";
import PostItem from "../components/PostItem";
import { DEFAULT_PROFILE_IMAGE, DEFAULT_COVER_IMAGE } from "../utils/constants";
import { generateShareableUrl, shareContent } from "../utils/linkingUtils";

const ProfileScreen = ({ navigation }) => {
    const { userInfo, logout, setUserInfo } = useContext(AuthContext);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("posts");
    const [updating, setUpdating] = useState(false);

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

    const pickProfileImage = async () => {
        try {
            const permissionResult =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissionResult.granted === false) {
                Alert.alert(
                    "Permission Required",
                    "You need to grant permission to access your photos"
                );
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                setUpdating(true);
                try {
                    await updateProfilePicture(result.assets[0].uri);
                    // Update local user info
                    setUserInfo({
                        ...userInfo,
                        profilePicture: result.assets[0].uri,
                    });
                    Alert.alert(
                        "Success",
                        "Profile picture updated successfully"
                    );
                } catch (error) {
                    console.log("Error updating profile picture:", error);
                    Alert.alert("Error", "Failed to update profile picture");
                } finally {
                    setUpdating(false);
                }
            }
        } catch (error) {
            console.log("Error picking image:", error);
            Alert.alert("Error", "An error occurred while selecting the image");
        }
    };

    const takeProfilePhoto = async () => {
        try {
            const permissionResult =
                await ImagePicker.requestCameraPermissionsAsync();
            if (permissionResult.granted === false) {
                Alert.alert(
                    "Permission Required",
                    "You need to grant permission to access your camera"
                );
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                setUpdating(true);
                try {
                    await updateProfilePicture(result.assets[0].uri);
                    // Update local user info
                    setUserInfo({
                        ...userInfo,
                        profilePicture: result.assets[0].uri,
                    });
                    Alert.alert(
                        "Success",
                        "Profile picture updated successfully"
                    );
                } catch (error) {
                    console.log("Error updating profile picture:", error);
                    Alert.alert("Error", "Failed to update profile picture");
                } finally {
                    setUpdating(false);
                }
            }
        } catch (error) {
            console.log("Error taking photo:", error);
            Alert.alert("Error", "An error occurred while taking the photo");
        }
    };

    const pickCoverPhoto = async () => {
        try {
            const permissionResult =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissionResult.granted === false) {
                Alert.alert(
                    "Permission Required",
                    "You need to grant permission to access your photos"
                );
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [16, 9],
                quality: 1,
            });

            if (!result.canceled) {
                setUpdating(true);
                try {
                    await updateCoverPhoto(result.assets[0].uri);
                    // Update local user info
                    setUserInfo({
                        ...userInfo,
                        coverPhoto: result.assets[0].uri,
                    });
                    Alert.alert("Success", "Cover photo updated successfully");
                } catch (error) {
                    console.log("Error updating cover photo:", error);
                    Alert.alert("Error", "Failed to update cover photo");
                } finally {
                    setUpdating(false);
                }
            }
        } catch (error) {
            console.log("Error picking image:", error);
            Alert.alert("Error", "An error occurred while selecting the image");
        }
    };

    const takeCoverPhoto = async () => {
        try {
            const permissionResult =
                await ImagePicker.requestCameraPermissionsAsync();
            if (permissionResult.granted === false) {
                Alert.alert(
                    "Permission Required",
                    "You need to grant permission to access your camera"
                );
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [16, 9],
                quality: 1,
            });

            if (!result.canceled) {
                setUpdating(true);
                try {
                    await updateCoverPhoto(result.assets[0].uri);
                    // Update local user info
                    setUserInfo({
                        ...userInfo,
                        coverPhoto: result.assets[0].uri,
                    });
                    Alert.alert("Success", "Cover photo updated successfully");
                } catch (error) {
                    console.log("Error updating cover photo:", error);
                    Alert.alert("Error", "Failed to update cover photo");
                } finally {
                    setUpdating(false);
                }
            }
        } catch (error) {
            console.log("Error taking photo:", error);
            Alert.alert("Error", "An error occurred while taking the photo");
        }
    };

    const handleCreatePost = () => {
        Alert.alert("Create Post", "Share what's on your mind", [
            { text: "Cancel", style: "cancel" },
            { text: "Create", onPress: () => navigation.navigate("Home") },
        ]);
    };

    const handleAddStory = () => {
        Alert.alert("Add to Story", "Share a photo or write something", [
            { text: "Cancel", style: "cancel" },
            { text: "Add", onPress: () => console.log("Adding to story") },
        ]);
    };

    const handleShareProfile = () => {
        const shareableUrl = generateShareableUrl("profile", {
            userId: userInfo?._id || "currentUser",
        });
        shareContent({
            title: `${userInfo?.name}'s Profile`,
            message: `Check out ${userInfo?.name}'s profile on Facebook Clone!`,
            url: shareableUrl,
        });
    };

    const ProfileHeader = () => (
        <View style={styles.profileHeader}>
            <TouchableOpacity
                style={styles.coverPhotoContainer}
                onPress={() => showImageOptions("cover")}
                activeOpacity={0.9}
            >
                <Image
                    source={{
                        uri: userInfo?.coverPhoto || DEFAULT_COVER_IMAGE,
                    }}
                    style={styles.coverPhoto}
                />
                <View style={styles.editCoverButton}>
                    <Ionicons name="camera" size={22} color="#fff" />
                </View>
            </TouchableOpacity>
            <View style={styles.profilePhotoContainer}>
                <TouchableOpacity
                    onPress={() => showImageOptions("profile")}
                    activeOpacity={0.9}
                >
                    <Image
                        source={{
                            uri:
                                userInfo?.profilePicture ||
                                DEFAULT_PROFILE_IMAGE,
                        }}
                        style={styles.profilePhoto}
                    />
                    <View style={styles.editProfilePhotoButton}>
                        <Ionicons name="camera" size={18} color="#fff" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.profileNameContainer}>
                <Text style={styles.profileName}>{userInfo?.name}</Text>
                <Text style={styles.bio}>
                    {userInfo?.bio ||
                        "No bio yet. Add one to tell people about yourself."}
                </Text>
                <TouchableOpacity
                    style={styles.editProfileButton}
                    onPress={() => navigation.navigate("EditProfile")}
                >
                    <Text style={styles.editProfileText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.profileActions}>
                <View style={styles.divider} />
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleCreatePost}
                    >
                        <Ionicons name="add-circle" size={16} color="#1877F2" />
                        <Text style={styles.actionButtonText}>Post</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleAddStory}
                    >
                        <Ionicons name="image" size={16} color="#1877F2" />
                        <Text style={styles.actionButtonText}>Story</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleShareProfile}
                    >
                        <Ionicons
                            name="share-social"
                            size={16}
                            color="#1877F2"
                        />
                        <Text style={styles.actionButtonText}>Share</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const renderAboutTab = () => (
        <View style={styles.aboutContainer}>
            <View style={styles.aboutSection}>
                <Text style={styles.aboutSectionTitle}>About</Text>
                <TouchableOpacity
                    style={styles.editSectionButton}
                    onPress={() => navigation.navigate("EditProfile")}
                >
                    <Ionicons name="pencil" size={16} color="#1877F2" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.aboutItem}
                onPress={() =>
                    Alert.alert(
                        "Edit Workplace",
                        "Add or change your workplace information"
                    )
                }
            >
                <Ionicons
                    name="briefcase"
                    size={22}
                    color="#65676B"
                    style={styles.aboutIcon}
                />
                <Text style={styles.aboutText}>
                    Works at {userInfo?.workplace || "Add workplace"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.aboutItem}
                onPress={() =>
                    Alert.alert(
                        "Edit Education",
                        "Add or change your education information"
                    )
                }
            >
                <Ionicons
                    name="school"
                    size={22}
                    color="#65676B"
                    style={styles.aboutIcon}
                />
                <Text style={styles.aboutText}>
                    Studied at {userInfo?.education || "Add education"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.aboutItem}
                onPress={() =>
                    Alert.alert(
                        "Edit Location",
                        "Add or change your current city"
                    )
                }
            >
                <Ionicons
                    name="home"
                    size={22}
                    color="#65676B"
                    style={styles.aboutIcon}
                />
                <Text style={styles.aboutText}>
                    Lives in {userInfo?.location || "Add current city"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.aboutItem}
                onPress={() =>
                    Alert.alert(
                        "Edit Relationship Status",
                        "Add or change your relationship status"
                    )
                }
            >
                <Ionicons
                    name="heart"
                    size={22}
                    color="#65676B"
                    style={styles.aboutIcon}
                />
                <Text style={styles.aboutText}>
                    {userInfo?.relationship || "Add relationship status"}
                </Text>
            </TouchableOpacity>
        </View>
    );

    const renderFriendsTab = () => (
        <View style={styles.friendsContainer}>
            <View style={styles.friendsHeader}>
                <Text style={styles.friendsTitle}>Friends</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Friends")}
                >
                    <Text style={styles.findFriendsText}>Find Friends</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.friendsSubtitle}>
                {userInfo?.friends?.length || 0} friends
            </Text>
            <View style={styles.emptyFriends}>
                <Ionicons name="people" size={50} color="#CCD0D5" />
                <Text style={styles.emptyFriendsText}>No friends to show</Text>
                <TouchableOpacity
                    style={styles.addFriendsButton}
                    onPress={() => navigation.navigate("Friends")}
                >
                    <Text style={styles.addFriendsText}>Find Friends</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderPhotosTab = () => (
        <View style={styles.photosContainer}>
            <View style={styles.photosHeader}>
                <Text style={styles.photosTitle}>Photos</Text>
                <TouchableOpacity
                    onPress={() =>
                        Alert.alert(
                            "All Photos",
                            "View all your photos and albums"
                        )
                    }
                >
                    <Text style={styles.viewAllPhotosText}>See All Photos</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.emptyPhotos}>
                <Ionicons name="images" size={50} color="#CCD0D5" />
                <Text style={styles.emptyPhotosText}>No photos to show</Text>
                <TouchableOpacity
                    style={styles.addPhotosButton}
                    onPress={() =>
                        Alert.alert(
                            "Add Photos",
                            "Upload photos to your profile"
                        )
                    }
                >
                    <Text style={styles.addPhotosText}>Add Photos</Text>
                </TouchableOpacity>
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
                                    onPress={handleCreatePost}
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
    profilePhotoContainer: {
        position: "relative",
    },
    profilePhoto: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 4,
        borderColor: "#fff",
    },
    editProfilePhotoButton: {
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
    profileNameContainer: {
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: -40,
    },
    profileName: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
        color: "#1c1e21",
    },
    bio: {
        fontSize: 16,
        color: "#65676B",
        textAlign: "center",
        marginTop: 5,
        paddingHorizontal: 20,
    },
    editProfileButton: {
        padding: 5,
    },
    editProfileText: {
        color: "#1877F2",
        fontWeight: "500",
    },
    profileActions: {
        flexDirection: "row",
        marginTop: 15,
        width: "100%",
        paddingHorizontal: 16,
        marginBottom: 15,
    },
    divider: {
        width: 1,
        backgroundColor: "#E4E6EB",
        marginHorizontal: 10,
    },
    actionButtons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
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
    actionButtonText: {
        color: "#65676B",
        fontWeight: "500",
        marginLeft: 5,
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
    addFriendsButton: {
        backgroundColor: "#1877F2",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginTop: 15,
    },
    addFriendsText: {
        color: "#fff",
        fontWeight: "500",
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
    addPhotosButton: {
        backgroundColor: "#1877F2",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginTop: 15,
    },
    addPhotosText: {
        color: "#fff",
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
});

export default ProfileScreen;
