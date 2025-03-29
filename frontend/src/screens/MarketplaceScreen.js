import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    TextInput,
    Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PLACEHOLDER_IMAGE } from "../utils/constants";
import { generateShareableUrl, shareContent } from "../utils/linkingUtils";

const MarketplaceScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const categories = [
        { id: "1", name: "All", icon: "grid" },
        { id: "2", name: "Vehicles", icon: "car" },
        { id: "3", name: "Property", icon: "home" },
        { id: "4", name: "Electronics", icon: "laptop" },
        { id: "5", name: "Furniture", icon: "bed" },
        { id: "6", name: "Clothing", icon: "shirt" },
    ];

    const products = [
        {
            id: "1",
            title: "iPhone 12 Pro Max",
            price: "$899",
            image: PLACEHOLDER_IMAGE,
            location: "New York, NY",
            timePosted: "Just now",
            category: "Electronics",
            description: "Excellent condition, barely used. Comes with charger and original box.",
            sellerContact: "seller1@example.com"
        },
        {
            id: "2",
            title: "Modern Couch",
            price: "$450",
            image: PLACEHOLDER_IMAGE,
            location: "Boston, MA",
            timePosted: "2 hours ago",
            category: "Furniture",
            description: "Gray fabric 3-seater couch in excellent condition. Pet-free and smoke-free home.",
            sellerContact: "seller2@example.com"
        },
        {
            id: "3",
            title: "Toyota Camry 2019",
            price: "$18,999",
            image: PLACEHOLDER_IMAGE,
            location: "Chicago, IL",
            timePosted: "1 day ago",
            category: "Vehicles",
            description: "Low mileage, single owner, well maintained. Full service history available.",
            sellerContact: "seller3@example.com"
        },
        {
            id: "4",
            title: "1 Bedroom Apartment",
            price: "$1,200/month",
            image: PLACEHOLDER_IMAGE,
            location: "San Francisco, CA",
            timePosted: "3 days ago",
            category: "Property",
            description: "Modern 1 bedroom apartment with great views. Utilities included.",
            sellerContact: "seller4@example.com"
        },
        {
            id: "5",
            title: "Designer Jacket",
            price: "$120",
            image: PLACEHOLDER_IMAGE,
            location: "Miami, FL",
            timePosted: "1 week ago",
            category: "Clothing",
            description: "Brand new designer jacket with tags. Size M.",
            sellerContact: "seller5@example.com"
        },
        {
            id: "6",
            title: "Gaming PC Setup",
            price: "$1,500",
            image: PLACEHOLDER_IMAGE,
            location: "Austin, TX",
            timePosted: "2 days ago",
            category: "Electronics",
            description: "Complete gaming setup including PC, monitor, keyboard, and mouse.",
            sellerContact: "seller6@example.com"
        },
    ];

    const filteredProducts = activeCategory === "All"
        ? products.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()))
        : products.filter(product =>
            product.category === activeCategory &&
            product.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleProductPress = (product) => {
        Alert.alert(
            product.title,
            `Price: ${product.price}\nLocation: ${product.location}\n\n${product.description}`,
            [
                {
                    text: "Contact Seller",
                    onPress: () => {
                        // For a real app, consider using Linking.openURL(`mailto:${product.sellerContact}`)
                        Alert.alert("Contact Info", `Email: ${product.sellerContact}`);
                    }
                },
                {
                    text: "Share Listing",
                    onPress: () => {
                        const shareableUrl = generateShareableUrl('marketplace', { productId: product.id });
                        shareContent({
                            title: product.title,
                            message: `Check out this item: ${product.title} - ${product.price}`,
                            url: shareableUrl
                        });
                    }
                },
                {
                    text: "Save",
                    onPress: () => Alert.alert("Saved", "This item has been saved to your saved items")
                },
                { text: "Close", style: "cancel" }
            ]
        );
    };

    const handleCreateListing = () => {
        Alert.alert(
            "Sell Something",
            "What would you like to sell?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Take Photo", onPress: () => console.log("Take photo") },
                { text: "Upload Photos", onPress: () => console.log("Upload photos") }
            ]
        );
    };

    const toggleFilter = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    const handleFilterApply = () => {
        Alert.alert("Filters Applied", "Your filters have been applied");
        setIsFilterVisible(false);
    };

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => handleProductPress(item)}
        >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productPrice}>{item.price}</Text>
                <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.productLocation}>{item.location}</Text>
                <Text style={styles.productTime}>{item.timePosted}</Text>
            </View>
            <TouchableOpacity
                style={styles.shareButton}
                onPress={() => {
                    const shareableUrl = generateShareableUrl('marketplace', { productId: item.id });
                    shareContent({
                        title: item.title,
                        message: `Check out this item: ${item.title} - ${item.price}`,
                        url: shareableUrl
                    });
                }}
            >
                <Ionicons name="share-social-outline" size={18} color="#65676B" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Marketplace</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => Alert.alert("Search", "Search products on Marketplace")}
                    >
                        <Ionicons name="search" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={handleCreateListing}
                    >
                        <Ionicons name="add-circle-outline" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#8e8e8e" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Marketplace"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={toggleFilter}
                >
                    <Ionicons name="options" size={20} color="#000" />
                </TouchableOpacity>
            </View>

            {isFilterVisible && (
                <View style={styles.filterContainer}>
                    <Text style={styles.filterTitle}>Filters</Text>
                    <View style={styles.filterOptions}>
                        <TouchableOpacity
                            style={styles.filterOption}
                            onPress={() => Alert.alert("Location", "Change your location")}
                        >
                            <Text style={styles.filterOptionLabel}>Location</Text>
                            <Text style={styles.filterOptionValue}>Current Location</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.filterOption}
                            onPress={() => Alert.alert("Price Range", "Set your price range")}
                        >
                            <Text style={styles.filterOptionLabel}>Price Range</Text>
                            <Text style={styles.filterOptionValue}>$0 - Any</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.filterOption}
                            onPress={() => Alert.alert("Sort By", "Choose how to sort listings")}
                        >
                            <Text style={styles.filterOptionLabel}>Sort By</Text>
                            <Text style={styles.filterOptionValue}>Most Recent</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.applyFilterButton}
                        onPress={handleFilterApply}
                    >
                        <Text style={styles.applyFilterText}>Apply Filters</Text>
                    </TouchableOpacity>
                </View>
            )}

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesContainer}
            >
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.categoryButton,
                            activeCategory === category.name && styles.activeCategoryButton,
                        ]}
                        onPress={() => setActiveCategory(category.name)}
                    >
                        <Ionicons
                            name={category.icon}
                            size={20}
                            color={activeCategory === category.name ? "#1877F2" : "#65676B"}
                        />
                        <Text
                            style={[
                                styles.categoryText,
                                activeCategory === category.name && styles.activeCategoryText,
                            ]}
                        >
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <FlatList
                data={filteredProducts}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.productRow}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="basket" size={60} color="#CCD0D5" />
                        <Text style={styles.emptyText}>No products found</Text>
                        <Text style={styles.emptySubtext}>Try changing your search or filters</Text>
                    </View>
                }
            />

            <TouchableOpacity
                style={styles.sellButton}
                onPress={handleCreateListing}
            >
                <Ionicons name="add" size={24} color="#fff" />
                <Text style={styles.sellButtonText}>Sell</Text>
            </TouchableOpacity>
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
        padding: 12,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
    },
    headerIcons: {
        flexDirection: "row",
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F0F2F5",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        backgroundColor: "#F0F2F5",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingLeft: 40,
        marginLeft: -30,
    },
    filterButton: {
        marginLeft: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F0F2F5",
        justifyContent: "center",
        alignItems: "center",
    },
    filterContainer: {
        backgroundColor: "#fff",
        padding: 15,
        margin: 10,
        borderRadius: 10,
    },
    filterTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    filterOptions: {
        marginBottom: 15,
    },
    filterOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    filterOptionLabel: {
        fontSize: 16,
        color: "#000",
    },
    filterOptionValue: {
        fontSize: 16,
        color: "#65676B",
    },
    applyFilterButton: {
        backgroundColor: "#1877F2",
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
    },
    applyFilterText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    categoriesContainer: {
        backgroundColor: "#fff",
        paddingVertical: 10,
        marginBottom: 8,
    },
    categoryButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginHorizontal: 5,
        borderRadius: 20,
        backgroundColor: "#F0F2F5",
    },
    activeCategoryButton: {
        backgroundColor: "#E7F3FF",
    },
    categoryText: {
        fontSize: 14,
        color: "#65676B",
        marginLeft: 5,
    },
    activeCategoryText: {
        color: "#1877F2",
    },
    productRow: {
        justifyContent: "space-between",
        paddingHorizontal: 8,
    },
    productCard: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 10,
        overflow: "hidden",
        position: "relative",
    },
    shareButton: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "#fff",
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
    },
    productImage: {
        width: "100%",
        height: 150,
        resizeMode: "cover",
    },
    productInfo: {
        padding: 10,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    productTitle: {
        fontSize: 14,
        marginBottom: 5,
    },
    productLocation: {
        fontSize: 12,
        color: "#65676B",
        marginBottom: 3,
    },
    productTime: {
        fontSize: 12,
        color: "#65676B",
    },
    sellButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#1877F2",
        borderRadius: 25,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 3,
    },
    sellButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 5,
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
        marginTop: 20,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1c1e21",
        marginTop: 15,
    },
    emptySubtext: {
        fontSize: 14,
        color: "#65676B",
        marginTop: 5,
        textAlign: "center",
    },
});

export default MarketplaceScreen;
