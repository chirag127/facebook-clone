import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    Image,
    RefreshControl,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { getPosts, createPost, likePost, unlikePost } from "../api/api";
import { DEFAULT_PROFILE_IMAGE } from "../utils/constants";
import PostItem from "../components/PostItem";
import CreatePostModal from "../components/CreatePostModal";

const HomeScreen = ({ navigation }) => {
    const { userInfo } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await getPosts();
            setPosts(response.data.data);
        } catch (error) {
            console.log("Error fetching posts:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchPosts();
    };

    const handleCreatePost = async (postData) => {
        try {
            await createPost(postData);
            fetchPosts();
            setModalVisible(false);
        } catch (error) {
            console.log("Error creating post:", error);
        }
    };

    const handleLikePost = async (postId, isLiked) => {
        try {
            if (isLiked) {
                await unlikePost(postId);
            } else {
                await likePost(postId);
            }
            fetchPosts();
        } catch (error) {
            console.log("Error liking/unliking post:", error);
        }
    };

    // Generate mock stories
    const stories = [
        {
            id: "1",
            user: {
                name: "Create Story",
                profilePicture:
                    userInfo?.profilePicture || DEFAULT_PROFILE_IMAGE,
            },
            isCreateStory: true,
        },
        {
            id: "2",
            user: {
                name: "John Doe",
                profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
            },
            image: "https://picsum.photos/id/237/200/300",
            viewed: false,
        },
        {
            id: "3",
            user: {
                name: "Jane Smith",
                profilePicture:
                    "https://randomuser.me/api/portraits/women/2.jpg",
            },
            image: "https://picsum.photos/id/238/200/300",
            viewed: false,
        },
        {
            id: "4",
            user: {
                name: "Robert Johnson",
                profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
            },
            image: "https://picsum.photos/id/239/200/300",
            viewed: true,
        },
        {
            id: "5",
            user: {
                name: "Sarah Williams",
                profilePicture:
                    "https://randomuser.me/api/portraits/women/4.jpg",
            },
            image: "https://picsum.photos/id/240/200/300",
            viewed: false,
        },
    ];

    const renderStory = (story) => {
        if (story.isCreateStory) {
            return (
                <TouchableOpacity
                    key={story.id}
                    style={styles.createStoryContainer}
                >
                    <View style={styles.storyImageContainer}>
                        <Image
                            source={{ uri: story.user.profilePicture }}
                            style={styles.storyImage}
                        />
                        <View style={styles.addStoryButton}>
                            <Ionicons
                                name="add-circle"
                                size={32}
                                color="#1877F2"
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: 16,
                                }}
                            />
                        </View>
                    </View>
                    <Text style={styles.createStoryText}>Create Story</Text>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity key={story.id} style={styles.storyContainer}>
                <View style={styles.storyImageContainer}>
                    <Image
                        source={{ uri: story.image }}
                        style={styles.storyImage}
                    />
                    <View
                        style={[
                            styles.storyProfilePicContainer,
                            { borderColor: story.viewed ? "#ccc" : "#1877F2" },
                        ]}
                    >
                        <Image
                            source={{ uri: story.user.profilePicture }}
                            style={styles.storyProfilePic}
                        />
                    </View>
                </View>
                <Text style={styles.storyUsername}>{story.user.name}</Text>
            </TouchableOpacity>
        );
    };

    const renderStories = () => (
        <View style={styles.storiesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {stories.map(renderStory)}
            </ScrollView>
        </View>
    );

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.createPostContainer}>
                <Image
                    source={{
                        uri: userInfo?.profilePicture || DEFAULT_PROFILE_IMAGE,
                    }}
                    style={styles.profilePic}
                />
                <TouchableOpacity
                    style={styles.createPostInput}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.createPostText}>
                        What's on your mind?
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="videocam" size={22} color="#F44337" />
                    <Text style={styles.actionText}>Live</Text>
                </TouchableOpacity>

                <View style={styles.actionDivider} />

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Ionicons name="images" size={22} color="#4CAF50" />
                    <Text style={styles.actionText}>Photo</Text>
                </TouchableOpacity>

                <View style={styles.actionDivider} />

                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="happy" size={22} color="#FFC107" />
                    <Text style={styles.actionText}>Feeling</Text>
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
            <View style={styles.topBar}>
                <Text style={styles.logo}>facebook</Text>
                <View style={styles.topBarIcons}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="search" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons
                            name="chatbubble-ellipses"
                            size={24}
                            color="#000"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={posts}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <PostItem
                        post={item}
                        onLike={(isLiked) => handleLikePost(item._id, isLiked)}
                        onComment={() =>
                            navigation.navigate("PostDetail", {
                                postId: item._id,
                            })
                        }
                        onProfilePress={() =>
                            navigation.navigate("UserProfile", {
                                userId: item.user._id,
                            })
                        }
                        currentUserId={userInfo?._id}
                    />
                )}
                ListHeaderComponent={
                    <>
                        {renderStories()}
                        {renderHeader()}
                    </>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
            />

            <CreatePostModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onCreatePost={handleCreatePost}
                user={userInfo}
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
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
        elevation: 2,
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    logo: {
        color: "#1877F2",
        fontSize: 28,
        fontWeight: "bold",
        fontFamily: "Arial",
    },
    topBarIcons: {
        flexDirection: "row",
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F0F2F5",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
    },
    storiesContainer: {
        paddingVertical: 10,
        backgroundColor: "#fff",
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
    },
    storyContainer: {
        width: 110,
        marginLeft: 10,
        position: "relative",
    },
    createStoryContainer: {
        width: 110,
        marginLeft: 10,
        position: "relative",
    },
    storyImageContainer: {
        height: 170,
        borderRadius: 10,
        overflow: "hidden",
        position: "relative",
        borderWidth: 1,
        borderColor: "#E4E6EB",
    },
    storyImage: {
        width: "100%",
        height: "100%",
    },
    storyProfilePicContainer: {
        position: "absolute",
        top: 8,
        left: 8,
        borderWidth: 4,
        borderColor: "#1877F2",
        borderRadius: 20,
    },
    storyProfilePic: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    storyUsername: {
        marginTop: 4,
        fontSize: 12,
        color: "#1c1e21",
    },
    createStoryText: {
        marginTop: 4,
        fontSize: 12,
        fontWeight: "bold",
        color: "#1c1e21",
    },
    addStoryButton: {
        position: "absolute",
        bottom: 8,
        alignSelf: "center",
    },
    header: {
        backgroundColor: "#fff",
        padding: 12,
        marginBottom: 8,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#E4E6EB",
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
    },
    createPostContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    createPostInput: {
        flex: 1,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F0F2F5",
        paddingHorizontal: 15,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#E4E6EB",
    },
    createPostText: {
        color: "#65676B",
    },
    divider: {
        height: 1,
        backgroundColor: "#E4E6EB",
        marginVertical: 12,
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    actionButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 6,
    },
    actionText: {
        marginLeft: 5,
        fontWeight: "500",
        color: "#65676B",
    },
    actionDivider: {
        width: 1,
        backgroundColor: "#E4E6EB",
        marginHorizontal: 4,
    },
});

export default HomeScreen;
