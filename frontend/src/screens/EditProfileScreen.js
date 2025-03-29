import React, { useState, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../context/AuthContext";
import {
    updateUserDetails,
    updateProfilePicture,
    updateCoverPhoto,
} from "../api/api";

const EditProfileScreen = ({ navigation }) => {
    const { userInfo, setUserInfo } = useContext(AuthContext);

    const [name, setName] = useState(userInfo?.name || "");
    const [bio, setBio] = useState(userInfo?.bio || "");
    const [location, setLocation] = useState(userInfo?.location || "");
    const [birthday, setBirthday] = useState(
        userInfo?.birthday
            ? new Date(userInfo.birthday).toISOString().split("T")[0]
            : ""
    );
    const [profilePicture, setProfilePicture] = useState(
        userInfo?.profilePicture || ""
    );
    const [coverPhoto, setCoverPhoto] = useState(userInfo?.coverPhoto || "");
    const [loading, setLoading] = useState(false);
    const [workplace, setWorkplace] = useState(userInfo?.workplace || "");
    const [education, setEducation] = useState(userInfo?.education || "");
    const [relationship, setRelationship] = useState(
        userInfo?.relationship || ""
    );

    const pickProfileImage = async () => {
        try {
            const permissionResult =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
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
                setProfilePicture(result.assets[0].uri);
                Alert.alert(
                    "Success",
                    "Profile picture selected. Remember to save your changes."
                );
            }
        } catch (error) {
            console.error("Error picking image:", error);
            Alert.alert("Error", "Failed to select image");
        }
    };

    const takeProfilePhoto = async () => {
        try {
            const permissionResult =
                await ImagePicker.requestCameraPermissionsAsync();

            if (!permissionResult.granted) {
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
                setProfilePicture(result.assets[0].uri);
                Alert.alert(
                    "Success",
                    "Profile picture taken. Remember to save your changes."
                );
            }
        } catch (error) {
            console.error("Error taking photo:", error);
            Alert.alert("Error", "Failed to take photo");
        }
    };

    const showProfileImageOptions = () => {
        Alert.alert("Change Profile Picture", "Choose an option", [
            { text: "Cancel", style: "cancel" },
            { text: "Take Photo", onPress: takeProfilePhoto },
            { text: "Choose from Library", onPress: pickProfileImage },
            {
                text: "Remove Current Photo",
                style: "destructive",
                onPress: () => {
                    setProfilePicture("");
                    Alert.alert(
                        "Removed",
                        "Profile picture removed. Remember to save your changes."
                    );
                },
            },
        ]);
    };

    const pickCoverImage = async () => {
        try {
            const permissionResult =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
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
                setCoverPhoto(result.assets[0].uri);
                Alert.alert(
                    "Success",
                    "Cover photo selected. Remember to save your changes."
                );
            }
        } catch (error) {
            console.error("Error picking image:", error);
            Alert.alert("Error", "Failed to select image");
        }
    };

    const takeCoverPhoto = async () => {
        try {
            const permissionResult =
                await ImagePicker.requestCameraPermissionsAsync();

            if (!permissionResult.granted) {
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
                setCoverPhoto(result.assets[0].uri);
                Alert.alert(
                    "Success",
                    "Cover photo taken. Remember to save your changes."
                );
            }
        } catch (error) {
            console.error("Error taking photo:", error);
            Alert.alert("Error", "Failed to take photo");
        }
    };

    const showCoverImageOptions = () => {
        Alert.alert("Change Cover Photo", "Choose an option", [
            { text: "Cancel", style: "cancel" },
            { text: "Take Photo", onPress: takeCoverPhoto },
            { text: "Choose from Library", onPress: pickCoverImage },
            {
                text: "Remove Current Photo",
                style: "destructive",
                onPress: () => {
                    setCoverPhoto("");
                    Alert.alert(
                        "Removed",
                        "Cover photo removed. Remember to save your changes."
                    );
                },
            },
        ]);
    };

    const validateInputs = () => {
        if (!name.trim()) {
            Alert.alert("Error", "Name is required");
            return false;
        }

        if (birthday && !/^\d{4}-\d{2}-\d{2}$/.test(birthday)) {
            Alert.alert("Error", "Birthday must be in YYYY-MM-DD format");
            return false;
        }

        return true;
    };

    const handleSave = async () => {
        if (!validateInputs()) return;

        setLoading(true);

        try {
            // Update profile details
            const userData = {
                name,
                bio,
                location,
                birthday: birthday
                    ? new Date(birthday).toISOString()
                    : undefined,
                workplace,
                education,
                relationship,
            };

            await updateUserDetails(userData);

            // Update profile picture if changed
            if (profilePicture !== userInfo.profilePicture) {
                await updateProfilePicture(profilePicture);
            }

            // Update cover photo if changed
            if (coverPhoto !== userInfo.coverPhoto) {
                await updateCoverPhoto(coverPhoto);
            }

            // Update local user info
            setUserInfo({
                ...userInfo,
                ...userData,
                profilePicture,
                coverPhoto,
            });

            Alert.alert("Success", "Profile updated successfully");
            navigation.goBack();
        } catch (error) {
            console.log("Error updating profile:", error);
            Alert.alert("Error", "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        Alert.alert(
            "Discard Changes",
            "Are you sure you want to discard your changes?",
            [
                { text: "Continue Editing", style: "cancel" },
                { text: "Discard", onPress: () => navigation.goBack() },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleCancel}>
                    <Ionicons name="close" size={24} color="#1877F2" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <TouchableOpacity
                    style={[
                        styles.saveButton,
                        loading && styles.disabledButton,
                    ]}
                    onPress={handleSave}
                    disabled={loading}
                >
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>

            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#1877F2" />
                </View>
            )}

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.coverPhotoContainer}>
                    <Image
                        source={{
                            uri:
                                coverPhoto ||
                                "https://via.placeholder.com/800x300",
                        }}
                        style={styles.coverPhoto}
                    />
                    <TouchableOpacity
                        style={styles.editCoverButton}
                        onPress={showCoverImageOptions}
                    >
                        <Ionicons name="camera" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.profilePicContainer}>
                    <Image
                        source={{
                            uri:
                                profilePicture ||
                                "https://via.placeholder.com/150",
                        }}
                        style={styles.profilePic}
                    />
                    <TouchableOpacity
                        style={styles.editProfilePicButton}
                        onPress={showProfileImageOptions}
                    >
                        <Ionicons name="camera" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Your name"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Bio</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={bio}
                            onChangeText={setBio}
                            placeholder="Tell us about yourself"
                            multiline
                            numberOfLines={4}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Location</Text>
                        <TextInput
                            style={styles.input}
                            value={location}
                            onChangeText={setLocation}
                            placeholder="Where do you live?"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Workplace</Text>
                        <TextInput
                            style={styles.input}
                            value={workplace}
                            onChangeText={setWorkplace}
                            placeholder="Where do you work?"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Education</Text>
                        <TextInput
                            style={styles.input}
                            value={education}
                            onChangeText={setEducation}
                            placeholder="Where did you study?"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Relationship Status</Text>
                        <TouchableOpacity
                            style={styles.dropdownButton}
                            onPress={() => {
                                Alert.alert(
                                    "Relationship Status",
                                    "Select your relationship status",
                                    [
                                        { text: "Cancel", style: "cancel" },
                                        {
                                            text: "Single",
                                            onPress: () =>
                                                setRelationship("Single"),
                                        },
                                        {
                                            text: "In a relationship",
                                            onPress: () =>
                                                setRelationship(
                                                    "In a relationship"
                                                ),
                                        },
                                        {
                                            text: "Engaged",
                                            onPress: () =>
                                                setRelationship("Engaged"),
                                        },
                                        {
                                            text: "Married",
                                            onPress: () =>
                                                setRelationship("Married"),
                                        },
                                        {
                                            text: "It's complicated",
                                            onPress: () =>
                                                setRelationship(
                                                    "It's complicated"
                                                ),
                                        },
                                        {
                                            text: "Clear",
                                            onPress: () => setRelationship(""),
                                        },
                                    ]
                                );
                            }}
                        >
                            <Text
                                style={
                                    relationship
                                        ? styles.selectedText
                                        : styles.placeholderText
                                }
                            >
                                {relationship || "Select relationship status"}
                            </Text>
                            <Ionicons
                                name="chevron-down"
                                size={20}
                                color="#65676B"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Birthday</Text>
                        <TextInput
                            style={styles.input}
                            value={birthday}
                            onChangeText={setBirthday}
                            placeholder="YYYY-MM-DD"
                        />
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.submitButton,
                            !name.trim() && styles.disabledButton,
                        ]}
                        onPress={handleSave}
                        disabled={loading || !name.trim()}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.submitButtonText}>
                                Save Changes
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    saveButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: "#1877F2",
        borderRadius: 6,
    },
    saveButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    disabledButton: {
        backgroundColor: "#BCC0C4",
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
    scrollContainer: {
        flex: 1,
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
    profilePicContainer: {
        alignItems: "center",
        marginTop: -50,
        position: "relative",
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: "#fff",
    },
    editProfilePicButton: {
        position: "absolute",
        right: "35%",
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    formContainer: {
        padding: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 5,
        color: "#65676B",
    },
    input: {
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    submitButton: {
        backgroundColor: "#1877F2",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    dropdownButton: {
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    selectedText: {
        fontSize: 16,
        color: "#1c1e21",
    },
    placeholderText: {
        fontSize: 16,
        color: "#8A8D91",
    },
});

export default EditProfileScreen;
