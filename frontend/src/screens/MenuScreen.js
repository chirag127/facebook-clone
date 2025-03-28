import React, { useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

const MenuScreen = ({ navigation }) => {
    const { userInfo, logout } = useContext(AuthContext);

    const menuItems = [
        {
            id: "profile",
            title: "Profile",
            icon: "person",
            color: "#1877F2",
            onPress: () => navigation.navigate("Profile"),
        },
        {
            id: "friends",
            title: "Friends",
            icon: "people",
            color: "#1877F2",
            onPress: () => navigation.navigate("Friends"),
        },
        {
            id: "saved",
            title: "Saved",
            icon: "bookmark",
            color: "#8E24AA",
            onPress: () => {},
        },
        {
            id: "groups",
            title: "Groups",
            icon: "people-circle",
            color: "#1565C0",
            onPress: () => {},
        },
        {
            id: "marketplace",
            title: "Marketplace",
            icon: "storefront",
            color: "#4CAF50",
            onPress: () => {},
        },
        {
            id: "memories",
            title: "Memories",
            icon: "time",
            color: "#FB8C00",
            onPress: () => {},
        },
        {
            id: "pages",
            title: "Pages",
            icon: "flag",
            color: "#F44336",
            onPress: () => {},
        },
        {
            id: "events",
            title: "Events",
            icon: "calendar",
            color: "#E91E63",
            onPress: () => {},
        },
        {
            id: "settings",
            title: "Settings & Privacy",
            icon: "settings",
            color: "#616161",
            onPress: () => {},
        },
        {
            id: "help",
            title: "Help & Support",
            icon: "help-circle",
            color: "#616161",
            onPress: () => {},
        },
        {
            id: "logout",
            title: "Log Out",
            icon: "log-out",
            color: "#616161",
            onPress: logout,
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
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Menu</Text>
                <TouchableOpacity style={styles.searchButton}>
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

                <View style={styles.menuList}>
                    {menuItems.map(renderMenuItem)}
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
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
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
    },
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    profileInfo: {
        marginLeft: 15,
    },
    profileName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    viewProfile: {
        color: "#65676B",
        marginTop: 3,
    },
    divider: {
        height: 8,
        backgroundColor: "#F0F2F5",
    },
    menuList: {
        backgroundColor: "#fff",
        paddingVertical: 10,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 15,
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
});

export default MenuScreen;
