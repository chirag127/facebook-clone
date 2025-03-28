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

    const pickProfileImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfilePicture(result.assets[0].uri);
        }
    };

    const pickCoverImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            setCoverPhoto(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        if (!name.trim()) {
            Alert.alert("Error", "Name is required");
            return;
        }

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
            };

            const response = await updateUserDetails(userData);

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

    return (
        <ScrollView style={styles.container}>
            <View style={styles.coverPhotoContainer}>
                <Image
                    source={{
                        uri:
                            coverPhoto || "https://via.placeholder.com/800x300",
                    }}
                    style={styles.coverPhoto}
                />
                <TouchableOpacity
                    style={styles.editCoverButton}
                    onPress={pickCoverImage}
                >
                    <Ionicons name="camera" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.profilePicContainer}>
                <Image
                    source={{
                        uri:
                            profilePicture || "https://via.placeholder.com/150",
                    }}
                    style={styles.profilePic}
                />
                <TouchableOpacity
                    style={styles.editProfilePicButton}
                    onPress={pickProfileImage}
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
                    <Text style={styles.label}>Birthday</Text>
                    <TextInput
                        style={styles.input}
                        value={birthday}
                        onChangeText={setBirthday}
                        placeholder="YYYY-MM-DD"
                    />
                </View>

                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F2F5",
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
        marginTop: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#65676B",
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#E4E6EB",
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    saveButton: {
        backgroundColor: "#1877F2",
        borderRadius: 5,
        padding: 15,
        alignItems: "center",
        marginTop: 10,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default EditProfileScreen;
