import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    FlatList,
    Alert,
    Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HelpScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedQuestion, setExpandedQuestion] = useState(null);
    const [activeCategory, setActiveCategory] = useState("Popular Topics");

    const helpCategories = [
        "Popular Topics",
        "Account Settings",
        "Privacy & Security",
        "Content & Activities",
        "Messages & Calls",
        "Friends & Connections",
        "Marketplace",
        "Groups & Pages",
    ];

    const popularFaqs = [
        {
            id: 1,
            question: "How do I reset my password?",
            answer: 'To reset your password, go to the login screen and tap "Forgot Password". Enter your email or phone number associated with your account, and follow the instructions sent to you.',
            category: "Account Settings",
        },
        {
            id: 2,
            question: "How do I control who sees my posts?",
            answer: 'You can control the audience of your posts by tapping the privacy selector (usually shows "Friends" or "Public") before posting. You can also change the privacy of a post after it\'s been shared by tapping the three dots on the post and selecting "Edit Privacy".',
            category: "Privacy & Security",
        },
        {
            id: 3,
            question: "How do I report inappropriate content?",
            answer: 'To report content, tap the three dots on the post, comment, or profile, then select "Report". Choose the reason for reporting and follow the on-screen instructions to complete your report.',
            category: "Content & Activities",
        },
        {
            id: 4,
            question: "How do I create a post?",
            answer: 'To create a post, go to your News Feed or Profile, tap "What\'s on your mind?" at the top, enter your text or add photos/videos, select your audience, and tap "Post".',
            category: "Content & Activities",
        },
        {
            id: 5,
            question: "How do I delete my account?",
            answer: 'To delete your account, go to Settings & Privacy > Settings > Your Facebook Information > Deactivation and Deletion. Choose "Delete Account" and follow the instructions. Note that deletion is permanent after 30 days.',
            category: "Account Settings",
        },
        {
            id: 6,
            question: "How do I block someone?",
            answer: "To block someone, go to their profile, tap the three dots below their cover photo, select \"Block\", and confirm your decision. The person won't be notified that you've blocked them.",
            category: "Privacy & Security",
        },
        {
            id: 7,
            question: "How do I create a group?",
            answer: 'To create a group, tap the menu icon, select "Groups", tap the "+" or "Create" button, then follow the prompts to set up your group, including name, privacy settings, and adding members.',
            category: "Groups & Pages",
        },
        {
            id: 8,
            question: "How do I save posts to view later?",
            answer: 'To save a post, tap the three dots in the top right of the post and select "Save post". You can access your saved items later from the menu under "Saved".',
            category: "Content & Activities",
        },
        {
            id: 9,
            question: "How do I send a message to a friend?",
            answer: "To send a message, tap the Messenger icon, select the friend from your list or search for them, type your message in the text field at the bottom, and tap the send button.",
            category: "Messages & Calls",
        },
        {
            id: 10,
            question: "How do I add a friend?",
            answer: 'To add a friend, go to their profile and tap the "Add Friend" button. You can also find people you may know in the "Friends" section and send friend requests from there.',
            category: "Friends & Connections",
        },
        {
            id: 11,
            question: "How do I sell something on Marketplace?",
            answer: 'To sell on Marketplace, tap the Marketplace icon, select "Sell", choose a category, add photos and details of your item, set a price, confirm your location, and tap "Publish".',
            category: "Marketplace",
        },
        {
            id: 12,
            question: "How do I turn off notifications?",
            answer: "To manage notifications, go to Settings & Privacy > Settings > Notifications. From there, you can customize what you get notified about and how you receive those notifications.",
            category: "Account Settings",
        },
        {
            id: 13,
            question: "How do I create a Page for my business?",
            answer: 'To create a Page, tap the menu icon, scroll to "Pages", tap "Create", choose a category for your Page, enter your business details, and follow the setup steps.',
            category: "Groups & Pages",
        },
        {
            id: 14,
            question: "How do I make a video call?",
            answer: "To make a video call, open a chat with the person you want to call, tap the video camera icon in the top right, and wait for them to answer.",
            category: "Messages & Calls",
        },
        {
            id: 15,
            question: "How do I download my information?",
            answer: 'To download your information, go to Settings & Privacy > Settings > Your Facebook Information > Download Your Information. Select what data you want to download, the format, and quality, then tap "Create File".',
            category: "Privacy & Security",
        },
    ];

    const filteredFaqs = popularFaqs.filter(
        (faq) =>
            (activeCategory === "Popular Topics" ||
                faq.category === activeCategory) &&
            (searchQuery === "" ||
                faq.question
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleCategoryPress = (category) => {
        setActiveCategory(category);
        setExpandedQuestion(null);
    };

    const handleExpandQuestion = (id) => {
        setExpandedQuestion(expandedQuestion === id ? null : id);
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
        setExpandedQuestion(null);
    };

    const handleContactSupport = () => {
        Alert.alert("Contact Support", "How would you like to contact us?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Email Support",
                onPress: () => {
                    Linking.openURL("mailto:support@facebookclone.com").catch(
                        (err) =>
                            Alert.alert(
                                "Could not open email client",
                                "Please send an email to support@facebookclone.com"
                            )
                    );
                },
            },
            {
                text: "Live Chat",
                onPress: () =>
                    Alert.alert(
                        "Live Chat",
                        "Live chat support is currently unavailable. Please try again during business hours (9 AM - 5 PM EST)."
                    ),
            },
            {
                text: "Support Center",
                onPress: () =>
                    navigation.navigate("WebViewScreen", {
                        url: "https://www.facebook.com/help/",
                        title: "Support Center",
                    }),
            },
        ]);
    };

    const renderCategory = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.categoryButton,
                activeCategory === item && styles.activeCategoryButton,
            ]}
            onPress={() => handleCategoryPress(item)}
        >
            <Text
                style={[
                    styles.categoryText,
                    activeCategory === item && styles.activeCategoryText,
                ]}
            >
                {item}
            </Text>
        </TouchableOpacity>
    );

    const renderFaqItem = ({ item }) => (
        <TouchableOpacity
            style={styles.faqItem}
            onPress={() => handleExpandQuestion(item.id)}
        >
            <View style={styles.questionRow}>
                <Text style={styles.questionText}>{item.question}</Text>
                <Ionicons
                    name={
                        expandedQuestion === item.id
                            ? "chevron-up"
                            : "chevron-down"
                    }
                    size={20}
                    color="#666"
                />
            </View>
            {expandedQuestion === item.id && (
                <View style={styles.answerContainer}>
                    <Text style={styles.answerText}>{item.answer}</Text>
                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() =>
                                Alert.alert(
                                    "Feedback",
                                    "Thank you for marking this answer as helpful!"
                                )
                            }
                        >
                            <Ionicons
                                name="thumbs-up-outline"
                                size={16}
                                color="#1877F2"
                            />
                            <Text style={styles.actionButtonText}>Helpful</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() =>
                                Alert.alert(
                                    "Feedback",
                                    "We appreciate your feedback. We'll work to improve this answer."
                                )
                            }
                        >
                            <Ionicons
                                name="thumbs-down-outline"
                                size={16}
                                color="#1877F2"
                            />
                            <Text style={styles.actionButtonText}>
                                Not Helpful
                            </Text>
                        </TouchableOpacity>
                    </View>
            </View>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#1877F2" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Help Center</Text>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={handleContactSupport}
                >
                    <Ionicons name="mail-outline" size={24} color="#1877F2" />
                </TouchableOpacity>
            </View>

                <View style={styles.searchContainer}>
                <Ionicons
                    name="search"
                    size={20}
                    color="#8A8D91"
                    style={styles.searchIcon}
                />
                        <TextInput
                            style={styles.searchInput}
                    placeholder="Search for help topics..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    placeholderTextColor="#8A8D91"
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={() => setSearchQuery("")}
                    >
                        <Ionicons
                            name="close-circle"
                            size={18}
                            color="#8A8D91"
                        />
                    </TouchableOpacity>
                )}
                </View>

            <View style={styles.categoriesContainer}>
                <FlatList
                    data={helpCategories}
                    renderItem={renderCategory}
                    keyExtractor={(item) => item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesList}
                />
                </View>

            <View style={styles.contentContainer}>
                {filteredFaqs.length > 0 ? (
                    <FlatList
                        data={filteredFaqs}
                        renderItem={renderFaqItem}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={true}
                        contentContainerStyle={styles.faqsList}
                    />
                ) : (
                    <View style={styles.noResultsContainer}>
                        <Ionicons
                            name="search-outline"
                            size={50}
                            color="#BCC0C4"
                        />
                        <Text style={styles.noResultsText}>
                            No results found for "{searchQuery}"
                    </Text>
                        <Text style={styles.noResultsSubtext}>
                            Try different keywords or browse the categories
                        </Text>
                        <TouchableOpacity
                            style={styles.contactSupportButton}
                            onPress={handleContactSupport}
                        >
                            <Text style={styles.contactSupportText}>
                                Contact Support
                        </Text>
                    </TouchableOpacity>
                </View>
                )}
            </View>

            <TouchableOpacity
                style={styles.floatingButton}
                onPress={handleContactSupport}
            >
                <Ionicons
                    name="chatbubble-ellipses"
                    size={24}
                    color="#FFFFFF"
                />
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
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1C1E21",
    },
    headerButton: {
        padding: 5,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: "#E4E6EB",
    },
    searchIcon: {
        marginRight: 5,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    clearButton: {
        padding: 5,
    },
    categoriesContainer: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    categoriesList: {
        paddingHorizontal: 10,
    },
    categoryButton: {
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
    },
    activeCategoryText: {
        color: "#1877F2",
        fontWeight: "500",
    },
    contentContainer: {
        flex: 1,
        backgroundColor: "#F0F2F5",
    },
    faqsList: {
        padding: 10,
    },
    faqItem: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        marginBottom: 10,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    questionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    questionText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#1C1E21",
        flex: 1,
        marginRight: 10,
    },
    answerContainer: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#E4E6EB",
    },
    answerText: {
        fontSize: 15,
        color: "#65676B",
        lineHeight: 22,
    },
    actionButtons: {
        flexDirection: "row",
        marginTop: 15,
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20,
    },
    actionButtonText: {
        fontSize: 14,
        color: "#1877F2",
        marginLeft: 5,
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    noResultsText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1C1E21",
        marginTop: 15,
        textAlign: "center",
    },
    noResultsSubtext: {
        fontSize: 15,
        color: "#65676B",
        marginTop: 5,
        textAlign: "center",
    },
    contactSupportButton: {
        marginTop: 20,
        backgroundColor: "#1877F2",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    contactSupportText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
    floatingButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#1877F2",
        width: 55,
        height: 55,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default HelpScreen;
