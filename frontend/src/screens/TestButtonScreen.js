import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Button,
    ScrollView,
    Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TestButtonScreen = ({ navigation }) => {
    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(false);

    const handleBasicPress = () => {
        console.log("Basic button pressed");
        Alert.alert("Button Pressed", "Basic button was pressed");
    };

    const handleIconPress = () => {
        console.log("Icon button pressed");
        Alert.alert("Button Pressed", "Icon button was pressed");
    };

    const handleNavigationPress = () => {
        console.log("Navigation button pressed");
        Alert.alert("Navigation", "Navigating back");
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleNavigationPress}
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={24} color="#1877F2" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Button Test Screen</Text>
            </View>

            <ScrollView style={styles.content}>
                <Text style={styles.title}>Test Different Button Types</Text>

                {/* React Native Button component */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>React Native Button</Text>
                    <Button
                        title="Press Me"
                        onPress={handleBasicPress}
                        color="#1877F2"
                    />
                </View>

                {/* TouchableOpacity */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>TouchableOpacity</Text>
                    <TouchableOpacity
                        style={styles.touchableButton}
                        onPress={handleBasicPress}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.buttonText}>Press Me</Text>
                    </TouchableOpacity>
                </View>

                {/* TouchableOpacity with Icon */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        TouchableOpacity with Icon
                    </Text>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={handleIconPress}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="settings-outline"
                            size={24}
                            color="#FFFFFF"
                        />
                        <Text style={styles.iconButtonText}>Settings</Text>
                    </TouchableOpacity>
                </View>

                {/* Switch */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Switch</Text>
                    <View style={styles.switchContainer}>
                        <Text>Toggle 1</Text>
                        <Switch
                            value={toggle1}
                            onValueChange={() => {
                                console.log("Toggle 1 switched");
                                setToggle1(!toggle1);
                                Alert.alert(
                                    "Switch Toggled",
                                    `Toggle 1 is now ${!toggle1 ? "ON" : "OFF"}`
                                );
                            }}
                            trackColor={{ false: "#CCD0D5", true: "#1877F2" }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    <View style={styles.switchContainer}>
                        <Text>Toggle 2</Text>
                        <Switch
                            value={toggle2}
                            onValueChange={() => {
                                console.log("Toggle 2 switched");
                                setToggle2(!toggle2);
                                Alert.alert(
                                    "Switch Toggled",
                                    `Toggle 2 is now ${!toggle2 ? "ON" : "OFF"}`
                                );
                            }}
                            trackColor={{ false: "#CCD0D5", true: "#1877F2" }}
                            thumbColor="#FFFFFF"
                        />
                    </View>
                </View>

                {/* Menu Item Style Button */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Menu Item Style</Text>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => {
                            console.log("Menu item pressed");
                            Alert.alert("Menu Item", "Menu item was pressed");
                        }}
                        activeOpacity={0.7}
                    >
                        <View style={styles.menuItemLeft}>
                            <Ionicons
                                name="person-outline"
                                size={24}
                                color="#65676B"
                                style={styles.menuIcon}
                            />
                            <Text style={styles.menuText}>
                                Account Settings
                            </Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#65676B"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => {
                            console.log("Privacy menu item pressed");
                            Alert.alert(
                                "Menu Item",
                                "Privacy menu item was pressed"
                            );
                        }}
                        activeOpacity={0.7}
                    >
                        <View style={styles.menuItemLeft}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={24}
                                color="#65676B"
                                style={styles.menuIcon}
                            />
                            <Text style={styles.menuText}>
                                Privacy Settings
                            </Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#65676B"
                        />
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
        padding: 15,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    backButton: {
        padding: 10,
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    content: {
        flex: 1,
        padding: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    section: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    touchableButton: {
        backgroundColor: "#1877F2",
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    iconButton: {
        backgroundColor: "#1877F2",
        flexDirection: "row",
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    iconButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    menuItemLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    menuIcon: {
        marginRight: 10,
    },
    menuText: {
        fontSize: 16,
    },
});

export default TestButtonScreen;
