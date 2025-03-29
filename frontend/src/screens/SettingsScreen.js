import React, { useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

const SettingsScreen = ({ navigation }) => {
    const { userInfo } = useContext(AuthContext);
    const [darkMode, setDarkMode] = React.useState(false);
    const [notifications, setNotifications] = React.useState(true);
    const [dataUsage, setDataUsage] = React.useState(false);

    const toggleDarkMode = () => setDarkMode((previousState) => !previousState);
    const toggleNotifications = () =>
        setNotifications((previousState) => !previousState);
    const toggleDataUsage = () =>
        setDataUsage((previousState) => !previousState);

    const settingsSections = [
        {
            title: "Account",
            items: [
                {
                    id: "personal_info",
                    title: "Personal Information",
                    icon: "person",
                    color: "#1877F2",
                    onPress: () => navigation.navigate("EditProfile"),
                },
                {
                    id: "password",
                    title: "Password & Security",
                    icon: "lock-closed",
                    color: "#1877F2",
                    onPress: () => {},
                },
                {
                    id: "privacy",
                    title: "Privacy",
                    icon: "shield",
                    color: "#1877F2",
                    onPress: () => {},
                },
            ],
        },
        {
            title: "Preferences",
            items: [
                {
                    id: "dark_mode",
                    title: "Dark Mode",
                    icon: "moon",
                    color: "#6C757D",
                    toggle: true,
                    value: darkMode,
                    onToggle: toggleDarkMode,
                },
                {
                    id: "notifications",
                    title: "Notifications",
                    icon: "notifications",
                    color: "#6C757D",
                    toggle: true,
                    value: notifications,
                    onToggle: toggleNotifications,
                },
                {
                    id: "data_usage",
                    title: "Data Saver",
                    icon: "cellular",
                    color: "#6C757D",
                    toggle: true,
                    value: dataUsage,
                    onToggle: toggleDataUsage,
                },
                {
                    id: "language",
                    title: "Language",
                    icon: "globe",
                    color: "#6C757D",
                    value: "English (US)",
                    onPress: () => {},
                },
            ],
        },
        {
            title: "Support",
            items: [
                {
                    id: "help",
                    title: "Help Center",
                    icon: "help-circle",
                    color: "#28A745",
                    onPress: () => {},
                },
                {
                    id: "report",
                    title: "Report a Problem",
                    icon: "warning",
                    color: "#28A745",
                    onPress: () => {},
                },
                {
                    id: "terms",
                    title: "Terms & Policies",
                    icon: "document-text",
                    color: "#28A745",
                    onPress: () => {},
                },
            ],
        },
    ];

    const renderSettingItem = (item) => (
        <TouchableOpacity
            key={item.id}
            style={styles.settingItem}
            onPress={item.onPress}
            disabled={item.toggle}
        >
            <View style={styles.settingItemLeft}>
                <View
                    style={[
                        styles.iconContainer,
                        { backgroundColor: item.color },
                    ]}
                >
                    <Ionicons name={item.icon} size={20} color="#fff" />
                </View>
                <Text style={styles.settingItemText}>{item.title}</Text>
            </View>
            {item.toggle ? (
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={item.value ? "#1877F2" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={item.onToggle}
                    value={item.value}
                />
            ) : item.value ? (
                <View style={styles.settingItemRight}>
                    <Text style={styles.settingItemValue}>{item.value}</Text>
                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#65676B"
                    />
                </View>
            ) : (
                <Ionicons name="chevron-forward" size={20} color="#65676B" />
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1877F2" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings & Privacy</Text>
            </View>

            <ScrollView>
                {settingsSections.map((section) => (
                    <View key={section.title} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <View style={styles.sectionContent}>
                            {section.items.map(renderSettingItem)}
                        </View>
                    </View>
                ))}

                <View style={styles.version}>
                    <Text style={styles.versionText}>
                        Facebook Clone v1.0.0
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f2f5",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#65676B",
        marginVertical: 10,
        marginHorizontal: 15,
    },
    sectionContent: {
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    settingItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f2f5",
    },
    settingItemLeft: {
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
    settingItemText: {
        fontSize: 16,
    },
    settingItemRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    settingItemValue: {
        fontSize: 14,
        color: "#65676B",
        marginRight: 5,
    },
    version: {
        alignItems: "center",
        padding: 20,
        marginBottom: 20,
    },
    versionText: {
        fontSize: 14,
        color: "#65676B",
    },
});

export default SettingsScreen;
