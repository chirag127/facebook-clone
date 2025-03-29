import React, { useContext, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
    Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { DEFAULT_PROFILE_IMAGE } from "../utils/constants";

const MenuScreen = ({ navigation }) => {
    const { userInfo } = useContext(AuthContext);
    const [darkMode, setDarkMode] = useState(false);

    const menuCategories = [
        {
            title: "Shortcuts",
            items: [
                {
                    id: "memories",
                    title: "Memories",
                    icon: "time-outline",
                    color: "#1877F2",
                    onPress: () => navigation.navigate("Memories"),
                },
                {
                    id: "saved",
                    title: "Saved",
                    icon: "bookmark-outline",
                    color: "#C837AB",
                    onPress: () => navigation.navigate("Saved"),
                },
                {
                    id: "groups",
                    title: "Groups",
                    icon: "people-outline",
                    color: "#0BC6DF",
                    onPress: () => navigation.navigate("Groups"),
                },
                {
                    id: "marketplace",
                    title: "Marketplace",
                    icon: "storefront-outline",
                    color: "#F5533D",
                    onPress: () => navigation.navigate("Marketplace"),
                },
                {
                    id: "friends",
                    title: "Friends",
                    icon: "person-add-outline",
                    color: "#1877F2",
                    onPress: () => navigation.navigate("Friends"),
                },
                {
                    id: "feeds",
                    title: "Feeds",
                    icon: "newspaper-outline",
                    color: "#1877F2",
                    onPress: () => {
                        Alert.alert(
                            "Feeds",
                            "Choose what you want to see in your Feed",
                            [
                                { text: "Cancel", style: "cancel" },
                                {
                                    text: "Most Recent",
                                    onPress: () => {
                                        Alert.alert("Feed Preference", "Your feed will show most recent posts first");
                                        navigation.navigate("Home");
                                    }
                                },
                                {
                                    text: "Favorites",
                                    onPress: () => {
                                        Alert.alert("Feed Preference", "Your feed will show posts from favorites first");
                                        navigation.navigate("Home");
                                    }
                                }
                            ]
                        );
                    },
                },
                {
                    id: "pages",
                    title: "Pages",
                    icon: "flag-outline",
                    color: "#F79D3B",
                    onPress: () => navigation.navigate("Pages"),
                },
                {
                    id: "events",
                    title: "Events",
                    icon: "calendar-outline",
                    color: "#F02849",
                    onPress: () => navigation.navigate("Events"),
                },
            ],
        },
        {
            title: "Settings & Privacy",
            items: [
                {
                    id: "settings",
                    title: "Settings",
                    icon: "settings-outline",
                    color: "#65676B",
                    onPress: () => navigation.navigate("Settings"),
                },
                {
                    id: "dark_mode",
                    title: "Dark Mode",
                    icon: "moon-outline",
                    color: "#65676B",
                    toggle: true,
                    value: darkMode,
                    onToggle: () => {
                        setDarkMode(!darkMode);
                        Alert.alert(
                            "Dark Mode",
                            darkMode ? "Dark mode disabled" : "Dark mode enabled",
                            [{ text: "OK" }]
                        );
                    },
                },
                {
                    id: "activity_log",
                    title: "Activity Log",
                    icon: "list-outline",
                    color: "#65676B",
                    onPress: () => {
                        Alert.alert(
                            "Activity Log",
                            "See your activity on Facebook, including posts you've shared, liked, and commented on.",
                            [{ text: "View Activity", onPress: () => console.log("View activity") }, { text: "Cancel", style: "cancel" }]
                        );
                    },
                },
                {
                    id: "language",
                    title: "Language",
                    icon: "globe-outline",
                    color: "#65676B",
                    value: "English (US)",
                    onPress: () => {
                        Alert.alert(
                            "Language",
                            "Choose your language",
                            [
                                { text: "Cancel", style: "cancel" },
                                { text: "English (US)", onPress: () => console.log("Selected English") },
                                { text: "Español", onPress: () => console.log("Selected Spanish") },
                                { text: "Français", onPress: () => console.log("Selected French") },
                                { text: "More...", onPress: () => console.log("View more languages") }
                            ]
                        );
                    },
                },
            ],
        },
        {
            title: "Help & Support",
            items: [
                {
                    id: "help",
                    title: "Help Center",
                    icon: "help-circle-outline",
                    color: "#65676B",
                    onPress: () => navigation.navigate("Help"),
                },
                {
                    id: "report",
                    title: "Report a Problem",
                    icon: "warning-outline",
                    color: "#65676B",
                    onPress: () => {
                        Alert.alert(
                            "Report a Problem",
                            "What problem are you experiencing?",
                            [
                                { text: "Cancel", style: "cancel" },
                                {
                                    text: "Something Isn't Working",
                                    onPress: () => {
                                        Alert.alert(
                                            "Report Submitted",
                                            "Thanks for your feedback. We'll look into this issue."
                                        );
                                    }
                                },
                                {
                                    text: "Abusive Content",
                                    onPress: () => {
                                        Alert.alert(
                                            "Report Submitted",
                                            "Thanks for letting us know about this content. We'll review it soon."
                                        );
                                    }
                                },
                                {
                                    text: "Account Hacked",
                                    onPress: () => {
                                        Alert.alert(
                                            "Secure Your Account",
                                            "We'll help you secure your account and report any unauthorized activity."
                                        );
                                    }
                                },
                            ]
                        );
                    },
                },
                {
                    id: "privacy",
                    title: "Privacy Checkup",
                    icon: "shield-checkmark-outline",
                    color: "#65676B",
                    onPress: () => {
                        Alert.alert(
                            "Privacy Checkup",
                            "Review and strengthen your privacy settings",
                            [
                                { text: "Start Checkup", onPress: () => console.log("Privacy checkup started") },
                                { text: "Later", style: "cancel" }
                            ]
                        );
                    },
                },
                {
                    id: "terms",
                    title: "Terms & Policies",
                    icon: "document-text-outline",
                    color: "#65676B",
                    onPress: () => {
                        Alert.alert(
                            "Terms and Policies",
                            "View our terms of service and privacy policies",
                            [
                                { text: "Cancel", style: "cancel" },
                                { text: "Terms of Service", onPress: () => console.log("View terms") },
                                { text: "Privacy Policy", onPress: () => console.log("View privacy") },
                                { text: "Community Standards", onPress: () => console.log("View standards") }
                            ]
                        );
                    },
                },
            ],
        },
    ];

    const renderMenuItem = (item) => (
        <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
            disabled={item.toggle}
        >
            <View style={styles.menuItemLeft}>
                <View
                    style={[
                        styles.iconContainer,
                        { backgroundColor: item.color + "20" }, // Adding 20% opacity
                    ]}
                >
                    <Ionicons name={item.icon} size={24} color={item.color} />
                </View>
                <Text style={styles.menuItemText}>{item.title}</Text>
            </View>

            {item.toggle ? (
                <Switch
                    trackColor={{ false: "#CCD0D5", true: "#1877F2" }}
                    thumbColor="#FFFFFF"
                    onValueChange={item.onToggle}
                    value={item.value}
                />
            ) : item.value ? (
                <View style={styles.menuItemRight}>
                    <Text style={styles.menuItemValue}>{item.value}</Text>
                    <Ionicons name="chevron-forward" size={20} color="#65676B" />
                </View>
            ) : (
                <Ionicons name="chevron-forward" size={20} color="#65676B" />
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Menu</Text>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => {
                        Alert.alert(
                            "Search",
                            "What would you like to search for?",
                            [{ text: "Cancel", style: "cancel" }]
                        );
                    }}
                >
                    <Ionicons name="search" size={24} color="#1877F2" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollContainer}>
                <TouchableOpacity
                    style={styles.profileSection}
                    onPress={() => navigation.navigate("Profile")}
                >
                    <Image
                        source={{
                            uri: userInfo?.profilePicture || DEFAULT_PROFILE_IMAGE,
                        }}
                        style={styles.profileImage}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>
                            {userInfo?.name || "User Name"}
                        </Text>
                        <Text style={styles.viewProfile}>View your profile</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#65676B" />
                </TouchableOpacity>

                {menuCategories.map((category) => (
                    <View key={category.title} style={styles.menuCategory}>
                        <Text style={styles.categoryTitle}>{category.title}</Text>
                        <View style={styles.categoryItems}>
                            {category.items.map(renderMenuItem)}
                        </View>
                    </View>
                ))}

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => {
                        Alert.alert(
                            "Log Out",
                            "Are you sure you want to log out?",
                            [
                                { text: "Cancel", style: "cancel" },
                                {
                                    text: "Log Out",
                                    style: "destructive",
                                    onPress: () => {
                                        navigation.navigate("Login");
                                    }
                                }
                            ]
                        );
                    }}
                >
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
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
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F0F2F5",
        justifyContent: "center",
        alignItems: "center",
    },
    scrollContainer: {
        flex: 1,
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 15,
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 8,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    profileInfo: {
        flex: 1,
        marginLeft: 15,
    },
    profileName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    viewProfile: {
        fontSize: 14,
        color: "#65676B",
        marginTop: 2,
    },
    menuCategory: {
        marginTop: 20,
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 15,
        marginBottom: 10,
        color: "#65676B",
    },
    categoryItems: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 10,
        borderRadius: 8,
        overflow: "hidden",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F2F5",
    },
    menuItemLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    menuItemText: {
        fontSize: 16,
    },
    menuItemRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    menuItemValue: {
        fontSize: 14,
        color: "#65676B",
        marginRight: 5,
    },
    logoutButton: {
        backgroundColor: "#E4E6EB",
        margin: 20,
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    logoutText: {
        fontSize: 16,
        fontWeight: "medium",
        color: "#1C1E21",
    },
});

export default MenuScreen;
