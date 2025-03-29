import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HelpScreen = ({ navigation }) => {
    const helpTopics = [
        {
            id: "account",
            title: "Account & Profile",
            icon: "person",
            color: "#1877F2",
        },
        {
            id: "privacy",
            title: "Privacy & Security",
            icon: "shield",
            color: "#4267B2",
        },
        {
            id: "posts",
            title: "Posts & Content",
            icon: "newspaper",
            color: "#42B72A",
        },
        {
            id: "friends",
            title: "Friends & Connections",
            icon: "people",
            color: "#F7B928",
        },
        {
            id: "notifications",
            title: "Notifications",
            icon: "notifications",
            color: "#E94F64",
        },
        {
            id: "technical",
            title: "Technical Issues",
            icon: "construct",
            color: "#6C757D",
        },
    ];

    const faqItems = [
        {
            id: "faq1",
            question: "How do I reset my password?",
            answer: "To reset your password, go to the login screen and tap on 'Forgot Password'. Follow the instructions sent to your email to create a new password.",
        },
        {
            id: "faq2",
            question: "How can I control who sees my posts?",
            answer: "You can control your post privacy by selecting the audience before posting. Options include Public, Friends, or Custom. You can also edit the privacy of existing posts.",
        },
        {
            id: "faq3",
            question: "How do I report inappropriate content?",
            answer: "To report content, tap the three dots in the top right of the post, then select 'Report'. Choose the reason for reporting and submit your report.",
        },
    ];

    const renderHelpTopic = (item) => (
        <TouchableOpacity key={item.id} style={styles.topicItem}>
            <View
                style={[styles.iconContainer, { backgroundColor: item.color }]}
            >
                <Ionicons name={item.icon} size={24} color="#fff" />
            </View>
            <Text style={styles.topicTitle}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#65676B" />
        </TouchableOpacity>
    );

    const renderFaqItem = (item, index) => (
        <TouchableOpacity key={item.id} style={styles.faqItem}>
            <View style={styles.faqQuestion}>
                <Text style={styles.faqQuestionText}>{item.question}</Text>
                <Ionicons name="chevron-down" size={20} color="#65676B" />
            </View>
            <View style={styles.faqAnswer}>
                <Text style={styles.faqAnswerText}>{item.answer}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1877F2" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Help & Support</Text>
            </View>

            <ScrollView>
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color="#65676B" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search for help"
                            placeholderTextColor="#65676B"
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Help Topics</Text>
                    <View style={styles.topicsContainer}>
                        {helpTopics.map(renderHelpTopic)}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Frequently Asked Questions
                    </Text>
                    <View style={styles.faqContainer}>
                        {faqItems.map(renderFaqItem)}
                    </View>
                </View>

                <View style={styles.contactSection}>
                    <Text style={styles.contactTitle}>Still need help?</Text>
                    <TouchableOpacity style={styles.contactButton}>
                        <Ionicons name="chatbubbles" size={20} color="#fff" />
                        <Text style={styles.contactButtonText}>
                            Contact Support
                        </Text>
                    </TouchableOpacity>
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
    searchContainer: {
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0F2F5",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
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
    topicsContainer: {
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    topicItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f2f5",
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    topicTitle: {
        flex: 1,
        fontSize: 16,
    },
    faqContainer: {
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    faqItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#f0f2f5",
    },
    faqQuestion: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    faqQuestionText: {
        fontSize: 16,
        fontWeight: "500",
        flex: 1,
    },
    faqAnswer: {
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    faqAnswerText: {
        fontSize: 14,
        color: "#65676B",
        lineHeight: 20,
    },
    contactSection: {
        alignItems: "center",
        padding: 20,
        marginBottom: 20,
    },
    contactTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    contactButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1877F2",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    contactButtonText: {
        color: "#fff",
        fontWeight: "bold",
        marginLeft: 10,
    },
});

export default HelpScreen;
