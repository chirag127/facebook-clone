import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MarketplaceScreen = ({ navigation }) => {
    // Placeholder data for marketplace items
    const marketItems = [
        {
            id: "1",
            title: "iPhone 13 Pro Max",
            price: "$899",
            location: "San Francisco, CA",
            image: "https://via.placeholder.com/200",
        },
        {
            id: "2",
            title: "MacBook Pro 16-inch",
            price: "$1,799",
            location: "Palo Alto, CA",
            image: "https://via.placeholder.com/200",
        },
        {
            id: "3",
            title: "Sony PlayStation 5",
            price: "$499",
            location: "Mountain View, CA",
            image: "https://via.placeholder.com/200",
        },
        {
            id: "4",
            title: "Desk Chair - Like New",
            price: "$120",
            location: "Sunnyvale, CA",
            image: "https://via.placeholder.com/200",
        },
        {
            id: "5",
            title: "Coffee Table",
            price: "$75",
            location: "San Jose, CA",
            image: "https://via.placeholder.com/200",
        },
        {
            id: "6",
            title: "Mountain Bike",
            price: "$350",
            location: "Cupertino, CA",
            image: "https://via.placeholder.com/200",
        },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemCard}
            onPress={() =>
                Alert.alert(
                    item.title,
                    `${item.price} - ${item.location}\n\nView details for this item`,
                    [{ text: "OK" }]
                )
            }
        >
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <Text style={styles.itemTitle} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={styles.itemLocation}>{item.location}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1877F2" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Marketplace</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() =>
                            Alert.alert(
                                "Search Marketplace",
                                "Search for items to buy",
                                [{ text: "OK" }]
                            )
                        }
                    >
                        <Ionicons name="search" size={24} color="#1877F2" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() =>
                            Alert.alert(
                                "Marketplace Notifications",
                                "View your marketplace notifications",
                                [{ text: "OK" }]
                            )
                        }
                    >
                        <Ionicons
                            name="notifications"
                            size={24}
                            color="#1877F2"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.categories}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContent}
                >
                    <TouchableOpacity
                        style={styles.categoryButton}
                        onPress={() =>
                            Alert.alert(
                                "All Categories",
                                "Showing all marketplace items"
                            )
                        }
                    >
                        <Text style={styles.categoryText}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.categoryButton}
                        onPress={() =>
                            Alert.alert(
                                "Electronics",
                                "Showing electronics items"
                            )
                        }
                    >
                        <Text style={styles.categoryText}>Electronics</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.categoryButton}
                        onPress={() =>
                            Alert.alert("Furniture", "Showing furniture items")
                        }
                    >
                        <Text style={styles.categoryText}>Furniture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.categoryButton}
                        onPress={() =>
                            Alert.alert("Clothing", "Showing clothing items")
                        }
                    >
                        <Text style={styles.categoryText}>Clothing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.categoryButton}
                        onPress={() =>
                            Alert.alert("Vehicles", "Showing vehicle listings")
                        }
                    >
                        <Text style={styles.categoryText}>Vehicles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.categoryButton}
                        onPress={() =>
                            Alert.alert("Property", "Showing property listings")
                        }
                    >
                        <Text style={styles.categoryText}>Property</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <TouchableOpacity
                style={styles.sellButton}
                onPress={() =>
                    Alert.alert(
                        "Sell Something",
                        "Create a new listing to sell an item",
                        [
                            { text: "Cancel", style: "cancel" },
                            { text: "Create Listing" },
                        ]
                    )
                }
            >
                <Ionicons name="add-circle" size={24} color="#1877F2" />
                <Text style={styles.sellButtonText}>Sell Something</Text>
            </TouchableOpacity>

            <FlatList
                data={marketItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
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
    headerIcons: {
        flexDirection: "row",
    },
    iconButton: {
        marginLeft: 15,
    },
    categories: {
        backgroundColor: "#fff",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    categoriesContent: {
        paddingHorizontal: 10,
    },
    categoryButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: "#E4E6EB",
        borderRadius: 18,
        marginHorizontal: 5,
    },
    categoryText: {
        fontSize: 14,
        color: "#050505",
    },
    sellButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    sellButtonText: {
        marginLeft: 10,
        fontSize: 16,
        color: "#1877F2",
        fontWeight: "500",
    },
    listContainer: {
        padding: 5,
    },
    itemCard: {
        flex: 1,
        margin: 5,
        backgroundColor: "#fff",
        borderRadius: 8,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    itemImage: {
        width: "100%",
        height: 150,
        resizeMode: "cover",
    },
    itemInfo: {
        padding: 10,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    itemTitle: {
        fontSize: 14,
        marginBottom: 4,
    },
    itemLocation: {
        fontSize: 12,
        color: "#65676B",
    },
});

export default MarketplaceScreen;
