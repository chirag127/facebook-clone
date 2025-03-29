import React, { useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

const MenuScreen = ({ navigation }) => {
    const { userInfo, logout } = useContext(AuthContext);

    // Handle menu item functionality
    const handleMenuAction = (id) => {
        switch (id) {
            case "profile":
                navigation.navigate("Profile");
                break;
            case "friends":
                navigation.navigate("Friends");
                break;
            case "saved":
                navigation.navigate("Saved");
                break;
            case "groups":
                navigation.navigate("Groups");
                break;
            case "marketplace":
                navigation.navigate("Marketplace");
                break;
            case "memories":
                navigation.navigate("Memories");
                break;
            case "pages":
                navigation.navigate("Pages");
                break;
            case "events":
                navigation.navigate("Events");
                break;
            case "settings":
                navigation.navigate("Settings");
                break;
            case "help":
                navigation.navigate("Help");
                break;
            case "logout":
                logout();
                break;
            default:
                break;
        }
    };

    const menuItems = [
        {
            id: "profile",
            title: "Profile",
            icon: "person",
            color: "#1877F2",
            onPress: () => handleMenuAction("profile"),
        },
        {
            id: "friends",
            title: "Friends",
            icon: "people",
            color: "#1877F2",
            onPress: () => handleMenuAction("friends"),
        },
        {
            id: "saved",
            title: "Saved",
            icon: "bookmark",
            color: "#8E24AA",
            onPress: () => handleMenuAction("saved"),
        },
        {
            id: "groups",
            title: "Groups",
            icon: "people-circle",
            color: "#1565C0",
            onPress: () => handleMenuAction("groups"),
        },
        {
            id: "marketplace",
            title: "Marketplace",
            icon: "storefront",
            color: "#4CAF50",
            onPress: () => handleMenuAction("marketplace"),
        },
        {
            id: "memories",
            title: "Memories",
            icon: "time",
            color: "#FB8C00",
            onPress: () => handleMenuAction("memories"),
        },
        {
            id: "pages",
            title: "Pages",
            icon: "flag",
            color: "#F44336",
            onPress: () => handleMenuAction("pages"),
        },
        {
            id: "events",
            title: "Events",
            icon: "calendar",
            color: "#E91E63",
            onPress: () => handleMenuAction("events"),
        },
        {
            id: "settings",
            title: "Settings & Privacy",
            icon: "settings",
            color: "#616161",
            onPress: () => handleMenuAction("settings"),
        },
        {
            id: "help",
            title: "Help & Support",
            icon: "help-circle",
            color: "#616161",
            onPress: () => handleMenuAction("help"),
        },
        {
            id: "logout",
            title: "Log Out",
            icon: "log-out",
            color: "#616161",
            onPress: () => handleMenuAction("logout"),
        },
    ];

    const renderMenuItem = (item) => (
        <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
        >
            <View
                style={[styles.iconContainer, { backgroundColor: item.color }]}
            >
                <Ionicons name={item.icon} size={22} color="#fff" />
            </View>
            <Text style={styles.menuItemText}>{item.title}</Text>
            <View style={styles.arrowContainer}>
                <Ionicons name="chevron-forward" size={20} color="#65676B" />
            </View>
        </TouchableOpacity>
    );

    // Group menu items into sections
    const topMenuItems = menuItems.slice(0, 8);
    const bottomMenuItems = menuItems.slice(8);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Menu</Text>
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => Alert.alert("Search", "Search Facebook")}
                >
                    <Ionicons name="search" size={22} color="#000" />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <TouchableOpacity
                    style={styles.profileCard}
                    onPress={() => navigation.navigate("Profile")}
                >
                    <Image
                        source={{
                            uri:
                                userInfo?.profilePicture ||
                                "https://via.placeholder.com/150",
                        }}
                        style={styles.profilePic}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{userInfo?.name}</Text>
                        <Text style={styles.viewProfile}>
                            View your profile
                        </Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.divider} />

                <View style={styles.menuSection}>
                    <Text style={styles.menuSectionTitle}>All Shortcuts</Text>
                    <View style={styles.menuList}>
                        {topMenuItems.map(renderMenuItem)}
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.menuSection}>
                    <Text style={styles.menuSectionTitle}>Settings & More</Text>
                    <View style={styles.menuList}>
                        {bottomMenuItems.map(renderMenuItem)}
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Facebook © 2023</Text>
                    <Text style={styles.footerLink}>About</Text>
                    <Text style={styles.footerLink}>Terms</Text>
                    <Text style={styles.footerLink}>Privacy</Text>
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
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1877F2",
    },
    searchButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F0F2F5",
        justifyContent: "center",
        alignItems: "center",
    },
    profileCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#1877F2",
    },
    profileInfo: {
        marginLeft: 15,
    },
    profileName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#050505",
    },
    viewProfile: {
        color: "#65676B",
        marginTop: 3,
    },
    divider: {
        height: 10,
        backgroundColor: "#F0F2F5",
    },
    menuSection: {
        backgroundColor: "#fff",
        paddingTop: 12,
        marginBottom: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#E4E6EB",
    },
    menuSectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#65676B",
        paddingHorizontal: 15,
        paddingBottom: 8,
    },
    menuList: {
        backgroundColor: "#fff",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: "#E4E6EB",
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
        flex: 1,
        color: "#050505",
    },
    arrowContainer: {
        marginLeft: "auto",
    },
    footer: {
        padding: 20,
        alignItems: "center",
        backgroundColor: "#fff",
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#E4E6EB",
    },
    footerText: {
        color: "#65676B",
        fontSize: 12,
        marginBottom: 10,
    },
    footerLink: {
        color: "#1877F2",
        fontSize: 12,
        marginBottom: 5,
    },
});

export default MenuScreen;
