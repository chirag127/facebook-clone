import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EventsScreen = ({ navigation }) => {
    // Placeholder data for events
    const events = [
        {
            id: "1",
            title: "React Native Workshop",
            date: "June 25, 2024 • 2:00 PM",
            location: "Online",
            image: "https://via.placeholder.com/300x150",
            going: 125,
            interested: 350,
        },
        {
            id: "2",
            title: "JavaScript Conference 2024",
            date: "July 10-12, 2024 • 9:00 AM",
            location: "San Francisco, CA",
            image: "https://via.placeholder.com/300x150",
            going: 1200,
            interested: 3500,
        },
        {
            id: "3",
            title: "Mobile App Design Meetup",
            date: "June 30, 2024 • 6:30 PM",
            location: "New York, NY",
            image: "https://via.placeholder.com/300x150",
            going: 85,
            interested: 210,
        },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.eventCard}
            onPress={() =>
                Alert.alert(
                    item.title,
                    `${item.date}\n${item.location}\n\n${item.going} people going • ${item.interested} interested`,
                    [{ text: "OK" }]
                )
            }
        >
            <Image source={{ uri: item.image }} style={styles.eventImage} />
            <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventDate}>{item.date}</Text>
                <Text style={styles.eventLocation}>{item.location}</Text>
                <View style={styles.eventStats}>
                    <Text style={styles.eventStat}>
                        {item.going} going • {item.interested} interested
                    </Text>
                </View>
                <View style={styles.eventActions}>
                    <TouchableOpacity
                        style={styles.eventButton}
                        onPress={() =>
                            Alert.alert(
                                "Going",
                                `Mark that you're attending ${item.title}`,
                                [
                                    { text: "Cancel", style: "cancel" },
                                    { text: "Confirm" },
                                ]
                            )
                        }
                    >
                        <Ionicons
                            name="checkmark-circle"
                            size={18}
                            color="#1877F2"
                        />
                        <Text style={styles.eventButtonText}>Going</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.eventButton}
                        onPress={() =>
                            Alert.alert(
                                "Interested",
                                `Mark that you're interested in ${item.title}`,
                                [
                                    { text: "Cancel", style: "cancel" },
                                    { text: "Confirm" },
                                ]
                            )
                        }
                    >
                        <Ionicons name="star" size={18} color="#1877F2" />
                        <Text style={styles.eventButtonText}>Interested</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1877F2" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Events</Text>
                <TouchableOpacity
                    onPress={() =>
                        Alert.alert(
                            "Search Events",
                            "Search for events by name, location, or date",
                            [{ text: "OK" }]
                        )
                    }
                >
                    <Ionicons name="search" size={24} color="#1877F2" />
                </TouchableOpacity>
            </View>

            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[styles.tab, styles.activeTab]}
                    onPress={() =>
                        Alert.alert(
                            "For You",
                            "Showing events recommended for you"
                        )
                    }
                >
                    <Text style={[styles.tabText, styles.activeTabText]}>
                        For You
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tab}
                    onPress={() =>
                        Alert.alert("Going", "Showing events you're attending")
                    }
                >
                    <Text style={styles.tabText}>Going</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tab}
                    onPress={() =>
                        Alert.alert(
                            "Interested",
                            "Showing events you're interested in"
                        )
                    }
                >
                    <Text style={styles.tabText}>Interested</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tab}
                    onPress={() =>
                        Alert.alert(
                            "Past",
                            "Showing events that have already happened"
                        )
                    }
                >
                    <Text style={styles.tabText}>Past</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.createEventButton}
                onPress={() =>
                    Alert.alert(
                        "Create New Event",
                        "Create and share an event with your friends",
                        [
                            { text: "Cancel", style: "cancel" },
                            { text: "Create" },
                        ]
                    )
                }
            >
                <Ionicons name="add-circle" size={24} color="#1877F2" />
                <Text style={styles.createEventText}>Create New Event</Text>
            </TouchableOpacity>

            <FlatList
                data={events}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
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
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    tabs: {
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    tab: {
        paddingVertical: 15,
        marginRight: 20,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: "#1877F2",
    },
    tabText: {
        fontSize: 16,
        color: "#65676B",
    },
    activeTabText: {
        color: "#1877F2",
        fontWeight: "bold",
    },
    createEventButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    createEventText: {
        marginLeft: 10,
        fontSize: 16,
        color: "#1877F2",
        fontWeight: "500",
    },
    listContainer: {
        padding: 10,
    },
    eventCard: {
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 10,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    eventImage: {
        width: "100%",
        height: 150,
        resizeMode: "cover",
    },
    eventContent: {
        padding: 12,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    eventDate: {
        fontSize: 14,
        color: "#65676B",
        marginBottom: 3,
    },
    eventLocation: {
        fontSize: 14,
        color: "#65676B",
        marginBottom: 8,
    },
    eventStats: {
        marginBottom: 10,
    },
    eventStat: {
        fontSize: 14,
        color: "#65676B",
    },
    eventActions: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        paddingTop: 10,
    },
    eventButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingVertical: 8,
    },
    eventButtonText: {
        marginLeft: 5,
        fontSize: 14,
        color: "#1877F2",
        fontWeight: "500",
    },
});

export default EventsScreen;
