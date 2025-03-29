import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    TextInput,
    Image,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { DEFAULT_PROFILE_IMAGE } from "../utils/constants";

const CreatePostModal = ({ visible, onClose, onCreatePost, user }) => {
    const [postText, setPostText] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCreatePost = async () => {
        if (!postText.trim() && !image) return;

        setLoading(true);

        const postData = {
            text: postText,
            image: image,
        };

        await onCreatePost(postData);

        // Reset form
        setPostText("");
        setImage(null);
        setLoading(false);
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const removeImage = () => {
        setImage(null);
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={false}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Create Post</Text>
                    <TouchableOpacity
                        style={[
                            styles.postButton,
                            !postText.trim() && !image && styles.disabledButton,
                        ]}
                        onPress={handleCreatePost}
                        disabled={(!postText.trim() && !image) || loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.postButtonText}>Post</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.content}>
                    <View style={styles.userInfo}>
                        <Image
                            source={{
                                uri:
                                    user?.profilePicture ||
                                    DEFAULT_PROFILE_IMAGE,
                            }}
                            style={styles.profilePic}
                        />
                        <View>
                            <Text style={styles.userName}>{user?.name}</Text>
                            <View style={styles.privacySelector}>
                                <Ionicons
                                    name="earth"
                                    size={16}
                                    color="#65676B"
                                />
                                <Text style={styles.privacyText}>Public</Text>
                                <Ionicons
                                    name="chevron-down"
                                    size={16}
                                    color="#65676B"
                                />
                            </View>
                        </View>
                    </View>

                    <TextInput
                        style={styles.postInput}
                        placeholder="What's on your mind?"
                        multiline
                        value={postText}
                        onChangeText={setPostText}
                        autoFocus
                    />

                    {image && (
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: image }}
                                style={styles.selectedImage}
                            />
                            <TouchableOpacity
                                style={styles.removeImageButton}
                                onPress={removeImage}
                            >
                                <Ionicons
                                    name="close-circle"
                                    size={30}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>

                <View style={styles.footer}>
                    <Text style={styles.addToPostText}>Add to your post</Text>
                    <View style={styles.addOptions}>
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={pickImage}
                        >
                            <Ionicons name="images" size={24} color="#4CAF50" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Ionicons
                                name="person-add"
                                size={24}
                                color="#1877F2"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Ionicons name="happy" size={24} color="#FFC107" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Ionicons
                                name="location"
                                size={24}
                                color="#F44336"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Ionicons name="flag" size={24} color="#9C27B0" />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    postButton: {
        backgroundColor: "#1877F2",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: "#BCC0C4",
    },
    postButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    content: {
        flex: 1,
        padding: 15,
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userName: {
        fontWeight: "bold",
        fontSize: 16,
    },
    privacySelector: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E4E6EB",
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 5,
        marginTop: 5,
    },
    privacyText: {
        fontSize: 12,
        color: "#65676B",
        marginHorizontal: 5,
    },
    postInput: {
        fontSize: 18,
        minHeight: 100,
        textAlignVertical: "top",
    },
    imageContainer: {
        marginTop: 15,
        position: "relative",
    },
    selectedImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
    },
    removeImageButton: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    footer: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: "#E4E6EB",
    },
    addToPostText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    addOptions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    optionButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default CreatePostModal;
