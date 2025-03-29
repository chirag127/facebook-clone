import React, { useContext, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Switch,
    Alert,
    Modal,
    Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = ({ navigation }) => {
    const { setUserInfo, logout } = useContext(AuthContext);
    const [darkMode, setDarkMode] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [dataUsageRestricted, setDataUsageRestricted] = useState(false);
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const [privacySettings, setPrivacySettings] = useState({
        profileVisibility: "Friends",
        postVisibility: "Friends",
        friendRequests: "Everyone",
        taggingPermission: "Friends",
    });

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        Alert.alert(
            "Dark Mode",
            darkMode ? "Dark mode disabled" : "Dark mode enabled",
            [{ text: "OK" }]
        );
    };

    const toggleNotifications = () => {
        setNotificationsEnabled(!notificationsEnabled);
        Alert.alert(
            "Notifications",
            notificationsEnabled
                ? "Notifications disabled"
                : "Notifications enabled",
            [{ text: "OK" }]
        );
    };

    const toggleDataUsage = () => {
        setDataUsageRestricted(!dataUsageRestricted);
        Alert.alert(
            "Data Usage",
            dataUsageRestricted
                ? "Data usage restrictions removed"
                : "Data usage restrictions enabled",
            [{ text: "OK" }]
        );
    };

    const handleLogout = async () => {
        setLogoutModalVisible(false);

        try {
            // Clear user data
            await AsyncStorage.removeItem("userInfo");
            await AsyncStorage.removeItem("userToken");

            // Execute logout function from context
            logout();

            // Navigate to login
            navigation.navigate("Login");
        } catch (error) {
            console.log("Error during logout:", error);
            Alert.alert("Error", "Failed to logout. Please try again.");
        }
    };

    const handleAbout = () => {
        Alert.alert(
            "About Facebook Clone",
            "Version 1.0.0\nDeveloped for learning purposes.\nThis is a clone of Facebook for educational purposes only.",
            [{ text: "OK" }]
        );
    };

    const handlePrivacySettings = () => {
        Alert.alert(
            "Privacy Settings",
            "Manage who can see your content, send you friend requests, and more.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Profile Visibility",
                    onPress: () => {
                        Alert.alert(
                            "Profile Visibility",
                            "Choose who can see your profile",
                            [
                                { text: "Cancel", style: "cancel" },
                                {
                                    text: "Everyone",
                                    onPress: () =>
                                        setPrivacySettings({
                                            ...privacySettings,
                                            profileVisibility: "Everyone",
                                        }),
                                },
                                {
                                    text: "Friends",
                                    onPress: () =>
                                        setPrivacySettings({
                                            ...privacySettings,
                                            profileVisibility: "Friends",
                                        }),
                                },
                                {
                                    text: "Only Me",
                                    onPress: () =>
                                        setPrivacySettings({
                                            ...privacySettings,
                                            profileVisibility: "Only Me",
                                        }),
                                },
                            ]
                        );
                    },
                },
                {
                    text: "Post Visibility",
                    onPress: () => {
                        Alert.alert(
                            "Post Visibility",
                            "Choose who can see your future posts by default",
                            [
                                { text: "Cancel", style: "cancel" },
                                {
                                    text: "Public",
                                    onPress: () =>
                                        setPrivacySettings({
                                            ...privacySettings,
                                            postVisibility: "Public",
                                        }),
                                },
                                {
                                    text: "Friends",
                                    onPress: () =>
                                        setPrivacySettings({
                                            ...privacySettings,
                                            postVisibility: "Friends",
                                        }),
                                },
                                {
                                    text: "Only Me",
                                    onPress: () =>
                                        setPrivacySettings({
                                            ...privacySettings,
                                            postVisibility: "Only Me",
                                        }),
                                },
                            ]
                        );
                    },
                },
                {
                    text: "Friend Requests",
                    onPress: () => {
                        Alert.alert(
                            "Friend Requests",
                            "Choose who can send you friend requests",
                            [
                                { text: "Cancel", style: "cancel" },
                                {
                                    text: "Everyone",
                                    onPress: () =>
                                        setPrivacySettings({
                                            ...privacySettings,
                                            friendRequests: "Everyone",
                                        }),
                                },
                                {
                                    text: "Friends of Friends",
                                    onPress: () =>
                                        setPrivacySettings({
                                            ...privacySettings,
                                            friendRequests:
                                                "Friends of Friends",
                                        }),
                                },
                            ]
                        );
                    },
                },
            ]
        );
    };

    const handleAccountSettings = () => {
        Alert.alert("Account Settings", "Manage your account preferences", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Edit Profile",
                onPress: () => navigation.navigate("EditProfile"),
            },
            {
                text: "Change Password",
                onPress: () =>
                    Alert.alert(
                        "Change Password",
                        "This feature is not implemented in this demo."
                    ),
            },
            {
                text: "Download Your Information",
                onPress: () =>
                    Alert.alert(
                        "Download Your Information",
                        "This feature is not implemented in this demo."
                    ),
            },
        ]);
    };

    const handleHelp = () => {
        navigation.navigate("Help");
    };

    const handleTerms = () => {
        Alert.alert(
            "Terms and Policies",
            "View our terms of service and privacy policies",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Terms of Service",
                    onPress: () =>
                        Linking.openURL(
                            "https://www.facebook.com/terms.php"
                        ).catch((err) =>
                            Alert.alert("Error", "Could not open link")
                        ),
                },
                {
                    text: "Privacy Policy",
                    onPress: () =>
                        Linking.openURL(
                            "https://www.facebook.com/privacy/policy/"
                        ).catch((err) =>
                            Alert.alert("Error", "Could not open link")
                        ),
                },
                {
                    text: "Cookie Policy",
                    onPress: () =>
                        Linking.openURL(
                            "https://www.facebook.com/privacy/policies/cookies/"
                        ).catch((err) =>
                            Alert.alert("Error", "Could not open link")
                        ),
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="#1877F2" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings & Privacy</Text>
            </View>

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferences</Text>

                    <TouchableOpacity
                        style={styles.settingItem}
                        onPress={toggleDarkMode}
                    >
                        <View style={styles.settingLeftContent}>
                            <Ionicons
                                name="moon-outline"
                                size={24}
                                color="#65676B"
                                style={styles.settingIcon}
                            />
                            <Text style={styles.settingText}>Dark Mode</Text>
                        </View>
                        <Switch
                            value={darkMode}
                            onValueChange={toggleDarkMode}
                            trackColor={{ false: "#CCD0D5", true: "#1877F2" }}
                            thumbColor="#FFFFFF"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.settingItem}
                        onPress={toggleNotifications}
                    >
                        <View style={styles.settingLeftContent}>
                            <Ionicons
                                name="notifications-outline"
                                size={24}
                                color="#65676B"
                                style={styles.settingIcon}
                            />
                            <Text style={styles.settingText}>
                                Notifications
                            </Text>
                        </View>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={toggleNotifications}
                            trackColor={{ false: "#CCD0D5", true: "#1877F2" }}
                            thumbColor="#FFFFFF"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.settingItem}
                        onPress={toggleDataUsage}
                    >
                        <View style={styles.settingLeftContent}>
                            <Ionicons
                                name="cellular-outline"
                                size={24}
                                color="#65676B"
                                style={styles.settingIcon}
                            />
                            <Text style={styles.settingText}>Data Usage</Text>
                        </View>
                        <Switch
                            value={dataUsageRestricted}
                            onValueChange={toggleDataUsage}
                            trackColor={{ false: "#CCD0D5", true: "#1877F2" }}
                            thumbColor="#FFFFFF"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={handlePrivacySettings}
                    >
                        <View style={styles.settingLeftContent}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={24}
                                color="#65676B"
                                style={styles.settingIcon}
                            />
                            <Text style={styles.settingText}>
                                Privacy Settings
                            </Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={24}
                            color="#CCD0D5"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={handleAccountSettings}
                    >
                        <View style={styles.settingLeftContent}>
                            <Ionicons
                                name="person-outline"
                                size={24}
                                color="#65676B"
                                style={styles.settingIcon}
                            />
                            <Text style={styles.settingText}>
                                Account Settings
                            </Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={24}
                            color="#CCD0D5"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Help & Support</Text>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={handleHelp}
                    >
                        <View style={styles.settingLeftContent}>
                            <Ionicons
                                name="help-circle-outline"
                                size={24}
                                color="#65676B"
                                style={styles.settingIcon}
                            />
                            <Text style={styles.settingText}>Help Center</Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={24}
                            color="#CCD0D5"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={handleTerms}
                    >
                        <View style={styles.settingLeftContent}>
                            <Ionicons
                                name="document-text-outline"
                                size={24}
                                color="#65676B"
                                style={styles.settingIcon}
                            />
                            <Text style={styles.settingText}>
                                Terms and Policies
                            </Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={24}
                            color="#CCD0D5"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={handleAbout}
                    >
                        <View style={styles.settingLeftContent}>
                            <Ionicons
                                name="information-circle-outline"
                                size={24}
                                color="#65676B"
                                style={styles.settingIcon}
                            />
                            <Text style={styles.settingText}>About</Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={24}
                            color="#CCD0D5"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => setLogoutModalVisible(true)}
                >
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Logout confirmation modal */}
            <Modal
                visible={logoutModalVisible}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Log Out</Text>
                        <Text style={styles.modalMessage}>
                            Are you sure you want to log out?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    styles.cancelButton,
                                ]}
                                onPress={() => setLogoutModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    styles.confirmButton,
                                ]}
                                onPress={handleLogout}
                            >
                                <Text style={styles.confirmButtonText}>
                                    Log Out
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
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
        alignItems: "center",
        padding: 15,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    backButton: {
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    scrollContainer: {
        flex: 1,
    },
    section: {
        backgroundColor: "#FFFFFF",
        marginTop: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#E4E6EB",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1C1E21",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    settingItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    settingLeftContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    settingIcon: {
        marginRight: 15,
    },
    settingText: {
        fontSize: 16,
        color: "#1C1E21",
    },
    logoutButton: {
        backgroundColor: "#1877F2",
        margin: 20,
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    logoutText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 20,
        width: "80%",
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: "48%",
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#E4E6EB",
    },
    cancelButtonText: {
        color: "#1C1E21",
        fontWeight: "bold",
    },
    confirmButton: {
        backgroundColor: "#1877F2",
    },
    confirmButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});

export default SettingsScreen;
