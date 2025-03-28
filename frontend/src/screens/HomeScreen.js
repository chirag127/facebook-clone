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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { getPosts, createPost, likePost, unlikePost } from "../api/api";
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

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.createPostContainer}>
                <Image
                    source={{
                        uri:
                            userInfo?.profilePicture ||
                            "https://via.placeholder.com/150",
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

                <TouchableOpacity style={styles.actionButton}>
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
                ListHeaderComponent={renderHeader}
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
    },
    logo: {
        color: "#1877F2",
        fontSize: 24,
        fontWeight: "bold",
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
    },
    header: {
        backgroundColor: "#fff",
        padding: 12,
        marginBottom: 8,
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
        paddingVertical: 8,
    },
    actionText: {
        marginLeft: 5,
        color: "#65676B",
    },
    actionDivider: {
        width: 1,
        backgroundColor: "#E4E6EB",
    },
});

export default HomeScreen;
