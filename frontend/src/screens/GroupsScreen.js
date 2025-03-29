import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
    TextInput,
    Modal,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PLACEHOLDER_IMAGE, DEFAULT_PROFILE_IMAGE } from "../utils/constants";

const GroupsScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState("your-groups");
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [createGroupVisible, setCreateGroupVisible] = useState(false);
    const [newGroupName, setNewGroupName] = useState("");
    const [newGroupPrivacy, setNewGroupPrivacy] = useState("public");
    const [activeSort, setActiveSort] = useState("Recent activity");
    const [showFilters, setShowFilters] = useState(false);

    // Placeholder data for groups
    const [groups, setGroups] = useState([
        {
            id: "1",
            name: "React Native Developers",
            members: "10.2K members",
            image: PLACEHOLDER_IMAGE,
            isJoined: true,
            privacy: "Public",
            activity: "Very Active",
            lastPost: "2 hours ago",
            notifications: true,
        },
        {
            id: "2",
            name: "JavaScript Community",
            members: "25.5K members",
            image: PLACEHOLDER_IMAGE,
            isJoined: true,
            privacy: "Public",
            activity: "Active",
            lastPost: "5 hours ago",
            notifications: false,
        },
        {
            id: "3",
            name: "UI/UX Design Inspiration",
            members: "8.7K members",
            image: PLACEHOLDER_IMAGE,
            isJoined: false,
            privacy: "Private",
            activity: "Very Active",
            lastPost: "1 hour ago",
            notifications: false,
        },
        {
            id: "4",
            name: "Mobile App Development",
            members: "15.3K members",
            image: PLACEHOLDER_IMAGE,
            isJoined: false,
            privacy: "Public",
            activity: "Moderate",
            lastPost: "1 day ago",
            notifications: false,
        },
        {
            id: "5",
            name: "Tech Startups Network",
            members: "12.1K members",
            image: PLACEHOLDER_IMAGE,
            isJoined: false,
            privacy: "Public",
            activity: "Very Active",
            lastPost: "3 hours ago",
            notifications: false,
        },
        {
            id: "6",
            name: "iOS Developers",
            members: "18.9K members",
            image: PLACEHOLDER_IMAGE,
            isJoined: true,
            privacy: "Private",
            activity: "Active",
            lastPost: "6 hours ago",
            notifications: true,
        },
    ]);

    const toggleJoinGroup = (id) => {
        setGroups(
            groups.map((group) => {
                if (group.id === id) {
                    return {
                        ...group,
                        isJoined: !group.isJoined,
                        notifications: !group.isJoined,
                    };
                }
                return group;
            })
        );
    };

    const toggleNotifications = (id) => {
        setGroups(
            groups.map((group) => {
                if (group.id === id) {
                    return { ...group, notifications: !group.notifications };
                }
                return group;
            })
        );

        const group = groups.find((g) => g.id === id);
        if (group) {
            Alert.alert(
                "Notifications",
                group.notifications
                    ? `Notifications turned off for ${group.name}`
                    : `Notifications turned on for ${group.name}`
            );
        }
    };

    const handleCreateGroup = () => {
        if (!newGroupName.trim()) {
            Alert.alert("Error", "Group name cannot be empty");
            return;
        }

        const newGroup = {
            id: (groups.length + 1).toString(),
            name: newGroupName,
            members: "1 member",
            image: PLACEHOLDER_IMAGE,
            isJoined: true,
            privacy: newGroupPrivacy === "public" ? "Public" : "Private",
            activity: "New",
            lastPost: "Just now",
            notifications: true,
        };

        setGroups([newGroup, ...groups]);
        setCreateGroupVisible(false);
        setNewGroupName("");
        setNewGroupPrivacy("public");
        Alert.alert("Success", `"${newGroupName}" group has been created!`);
    };

    const applySort = (sortMethod) => {
        setActiveSort(sortMethod);
        setShowFilters(false);

        let sortedGroups = [...groups];

        switch (sortMethod) {
            case "Recent activity":
                // Sort by most recent activity based on lastPost
                sortedGroups = sortedGroups.sort((a, b) => {
                    if (
                        a.lastPost.includes("hour") &&
                        b.lastPost.includes("day")
                    )
                        return -1;
                    if (
                        a.lastPost.includes("day") &&
                        b.lastPost.includes("hour")
                    )
                        return 1;

                    const aHours = parseInt(a.lastPost);
                    const bHours = parseInt(b.lastPost);
                    return aHours - bHours;
                });
                break;
            case "Name":
                // Sort alphabetically by name
                sortedGroups = sortedGroups.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                break;
            case "Most active":
                // Sort by activity level
                const activityLevel = {
                    "Very Active": 3,
                    Active: 2,
                    Moderate: 1,
                    New: 0,
                };
                sortedGroups = sortedGroups.sort(
                    (a, b) =>
                        activityLevel[b.activity] - activityLevel[a.activity]
                );
                break;
        }

        setGroups(sortedGroups);
        Alert.alert("Sorted", `Groups sorted by ${sortMethod}`);
    };

    const filteredGroups = searchQuery
        ? groups.filter((group) =>
              group.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : activeTab === "your-groups"
        ? groups.filter((group) => group.isJoined)
        : groups;

    const handleViewGroup = (item) => {
        Alert.alert(
            item.name,
            `${item.name}\n${item.members}\n${item.privacy} Group\n${item.activity}\nLast Post: ${item.lastPost}`,
            [
                {
                    text: "See Posts",
                    onPress: () =>
                        Alert.alert(
                            "Group Posts",
                            `Viewing posts from ${item.name}`
                        ),
                },
                {
                    text: "Members",
                    onPress: () =>
                        Alert.alert(
                            "Group Members",
                            `Viewing members of ${item.name}`
                        ),
                },
                {
                    text: item.isJoined ? "Group Settings" : "View Group",
                    onPress: () => {
                        if (item.isJoined) {
                            Alert.alert("Group Settings", "Choose an option", [
                                { text: "Cancel", style: "cancel" },
                                {
                                    text: item.notifications
                                        ? "Turn Off Notifications"
                                        : "Turn On Notifications",
                                    onPress: () => toggleNotifications(item.id),
                                },
                                {
                                    text: "Invite Friends",
                                    onPress: () =>
                                        Alert.alert(
                                            "Invite",
                                            "Invite friends feature launched"
                                        ),
                                },
                                {
                                    text: "Leave Group",
                                    style: "destructive",
                                    onPress: () => {
                                        Alert.alert(
                                            "Leave Group",
                                            `Are you sure you want to leave ${item.name}?`,
                                            [
                                                {
                                                    text: "Cancel",
                                                    style: "cancel",
                                                },
                                                {
                                                    text: "Leave",
                                                    style: "destructive",
                                                    onPress: () => {
                                                        toggleJoinGroup(
                                                            item.id
                                                        );
                                                        Alert.alert(
                                                            "Left Group",
                                                            `You have left ${item.name}`
                                                        );
                                                    },
                                                },
                                            ]
                                        );
                                    },
                                },
                            ]);
                        } else {
                            Alert.alert(
                                "View Group",
                                `${
                                    item.name
                                } is a ${item.privacy.toLowerCase()} group. You can preview content before joining.`,
                                [
                                    { text: "Cancel", style: "cancel" },
                                    {
                                        text: "Join Group",
                                        onPress: () => {
                                            toggleJoinGroup(item.id);
                                            Alert.alert(
                                                "Joined Group",
                                                `You have joined ${item.name}`
                                            );
                                        },
                                    },
                                ]
                            );
                        }
                    },
                },
                { text: "Close", style: "cancel" },
            ]
        );
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.groupItem}
            onPress={() => handleViewGroup(item)}
        >
            <Image source={{ uri: item.image }} style={styles.groupImage} />
            <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{item.name}</Text>
                <Text style={styles.groupMembers}>{item.members}</Text>
                <View style={styles.groupDetails}>
                    <Text style={styles.groupPrivacy}>{item.privacy}</Text>
                    <Text style={styles.groupActivity}>• {item.activity}</Text>
                    {item.notifications && (
                        <View style={styles.notificationBadge}>
                            <Ionicons
                                name="notifications"
                                size={12}
                                color="#FFFFFF"
                            />
                        </View>
                    )}
                </View>
            </View>
            <TouchableOpacity
                style={[
                    styles.joinButton,
                    item.isJoined ? styles.joinedButton : {},
                ]}
                onPress={() => {
                    if (item.isJoined) {
                        Alert.alert(
                            "Leave Group",
                            `Are you sure you want to leave ${item.name}?`,
                            [
                                { text: "Cancel", style: "cancel" },
                                {
                                    text: "Leave",
                                    style: "destructive",
                                    onPress: () => {
                                        toggleJoinGroup(item.id);
                                        Alert.alert(
                                            "Left Group",
                                            `You have left ${item.name}`
                                        );
                                    },
                                },
                            ]
                        );
                    } else {
                    Alert.alert(
                            "Join Group",
                            `Would you like to join ${item.name}?`,
                        [
                            { text: "Cancel", style: "cancel" },
                                {
                                    text: "Join",
                                    onPress: () => {
                                        toggleJoinGroup(item.id);
                                        Alert.alert(
                                            "Joined Group",
                                            `You have joined ${item.name}`
                                        );
                                    },
                                },
                            ]
                        );
                    }
                }}
            >
                <Text
                    style={[
                        styles.joinButtonText,
                        item.isJoined ? styles.joinedButtonText : {},
                    ]}
                >
                    {item.isJoined ? "Joined" : "Join"}
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.headerButton}
                >
                    <Ionicons name="arrow-back" size={24} color="#1877F2" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Groups</Text>
                <View style={styles.headerRightButtons}>
                    <TouchableOpacity
                        style={[styles.headerButton, { marginRight: 10 }]}
                        onPress={() => setShowFilters(!showFilters)}
                    >
                        <Ionicons
                            name="options-outline"
                            size={22}
                            color="#1877F2"
                        />
                    </TouchableOpacity>
                <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => setSearchVisible(true)}
                >
                    <Ionicons name="search" size={24} color="#1877F2" />
                </TouchableOpacity>
                </View>
            </View>

            {searchVisible && (
                <View style={styles.searchContainer}>
                    <Ionicons
                        name="search"
                        size={20}
                        color="#8F8F8F"
                        style={styles.searchIcon}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search groups"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setSearchVisible(false);
                            setSearchQuery("");
                        }}
                    >
                        <Ionicons name="close" size={24} color="#8F8F8F" />
                    </TouchableOpacity>
                </View>
            )}

            {showFilters && (
                <View style={styles.filtersContainer}>
                    <Text style={styles.filtersTitle}>Sort by:</Text>
                    <TouchableOpacity
                        style={[
                            styles.filterOption,
                            activeSort === "Recent activity" &&
                                styles.activeFilterOption,
                        ]}
                        onPress={() => applySort("Recent activity")}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                activeSort === "Recent activity" &&
                                    styles.activeFilterText,
                            ]}
                        >
                            Recent activity
                        </Text>
                        {activeSort === "Recent activity" && (
                            <Ionicons
                                name="checkmark"
                                size={18}
                                color="#1877F2"
                            />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.filterOption,
                            activeSort === "Name" && styles.activeFilterOption,
                        ]}
                        onPress={() => applySort("Name")}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                activeSort === "Name" &&
                                    styles.activeFilterText,
                            ]}
                        >
                            Name
                        </Text>
                        {activeSort === "Name" && (
                            <Ionicons
                                name="checkmark"
                                size={18}
                                color="#1877F2"
                            />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.filterOption,
                            activeSort === "Most active" &&
                                styles.activeFilterOption,
                        ]}
                        onPress={() => applySort("Most active")}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                activeSort === "Most active" &&
                                    styles.activeFilterText,
                            ]}
                        >
                            Most active
                        </Text>
                        {activeSort === "Most active" && (
                            <Ionicons
                                name="checkmark"
                                size={18}
                                color="#1877F2"
                            />
                        )}
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === "your-groups" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("your-groups")}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === "your-groups" && styles.activeTabText,
                        ]}
                    >
                        Your Groups
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === "discover" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("discover")}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === "discover" && styles.activeTabText,
                        ]}
                    >
                        Discover
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredGroups}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons
                            name={
                                searchQuery
                                    ? "search-outline"
                                    : "people-circle-outline"
                            }
                            size={60}
                            color="#BCC0C4"
                        />
                        <Text style={styles.emptyTitle}>
                            {searchQuery
                                ? "No groups match your search"
                                : activeTab === "your-groups"
                                ? "You haven't joined any groups yet"
                                : "No groups to discover"}
                        </Text>
                        <Text style={styles.emptySubtitle}>
                            {searchQuery
                                ? "Try a different search term"
                                : activeTab === "your-groups"
                                ? "Join groups to see them here"
                                : "Check back later for group recommendations"}
                        </Text>
                        {searchQuery ? (
                            <TouchableOpacity
                                style={styles.createGroupButton}
                                onPress={() => {
                                    setSearchQuery("");
                                    setSearchVisible(false);
                                }}
                            >
                                <Text style={styles.createGroupButtonText}>
                                    Clear Search
                                </Text>
                            </TouchableOpacity>
                        ) : activeTab === "your-groups" ? (
                            <TouchableOpacity
                                style={styles.createGroupButton}
                                onPress={() => setActiveTab("discover")}
                            >
                                <Text style={styles.createGroupButtonText}>
                                    Discover Groups
                                </Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                }
            />

            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => setCreateGroupVisible(true)}
            >
                <Ionicons name="add" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <Modal
                visible={createGroupVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setCreateGroupVisible(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.modalContainer}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity
                                onPress={() => setCreateGroupVisible(false)}
                            >
                                <Ionicons
                                    name="close"
                                    size={24}
                                    color="#65676B"
                                />
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>
                                Create New Group
                            </Text>
                            <TouchableOpacity
                                onPress={handleCreateGroup}
                                disabled={!newGroupName.trim()}
                            >
                                <Text
                                    style={[
                                        styles.createButton,
                                        !newGroupName.trim() &&
                                            styles.disabledButton,
                                    ]}
                                >
                                    Create
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalBody}>
                            <View style={styles.creatorInfo}>
                                <Image
                                    source={{ uri: DEFAULT_PROFILE_IMAGE }}
                                    style={styles.creatorImage}
                                />
                                <Text style={styles.creatorName}>You</Text>
                                <Text style={styles.creatorRole}>Admin</Text>
                            </View>

                            <View style={styles.groupNameInput}>
                                <TextInput
                                    style={styles.groupNameField}
                                    placeholder="Group Name"
                                    value={newGroupName}
                                    onChangeText={setNewGroupName}
                                    placeholderTextColor="#65676B"
                                    autoFocus
                                />
                            </View>

                            <View style={styles.privacyContainer}>
                                <Text style={styles.privacyHeader}>
                                    Privacy:
                                </Text>
                                <View style={styles.privacyOptions}>
                                    <TouchableOpacity
                                        style={[
                                            styles.privacyOption,
                                            newGroupPrivacy === "public" &&
                                                styles.selectedPrivacy,
                                        ]}
                                        onPress={() =>
                                            setNewGroupPrivacy("public")
                                        }
                                    >
                                        <Ionicons
                                            name="globe-outline"
                                            size={20}
                                            color={
                                                newGroupPrivacy === "public"
                                                    ? "#1877F2"
                                                    : "#65676B"
                                            }
                                        />
                                        <View
                                            style={styles.privacyTextContainer}
                                        >
                                            <Text
                                                style={[
                                                    styles.privacyTitle,
                                                    newGroupPrivacy ===
                                                        "public" &&
                                                        styles.selectedPrivacyText,
                                                ]}
                                            >
                                                Public
                                            </Text>
                                            <Text
                                                style={
                                                    styles.privacyDescription
                                                }
                                            >
                                                Anyone can see who's in the
                                                group and what they post
                                            </Text>
                                        </View>
                                        {newGroupPrivacy === "public" && (
                                            <Ionicons
                                                name="checkmark-circle"
                                                size={24}
                                                color="#1877F2"
                                            />
                                        )}
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.privacyOption,
                                            newGroupPrivacy === "private" &&
                                                styles.selectedPrivacy,
                                        ]}
                                        onPress={() =>
                                            setNewGroupPrivacy("private")
                                        }
                                    >
                                        <Ionicons
                                            name="lock-closed-outline"
                                            size={20}
                                            color={
                                                newGroupPrivacy === "private"
                                                    ? "#1877F2"
                                                    : "#65676B"
                                            }
                                        />
                                        <View
                                            style={styles.privacyTextContainer}
                                        >
                                            <Text
                                                style={[
                                                    styles.privacyTitle,
                                                    newGroupPrivacy ===
                                                        "private" &&
                                                        styles.selectedPrivacyText,
                                                ]}
                                            >
                                                Private
                                            </Text>
                                            <Text
                                                style={
                                                    styles.privacyDescription
                                                }
                                            >
                                                Only members can see who's in
                                                the group and what they post
                                            </Text>
                                        </View>
                                        {newGroupPrivacy === "private" && (
                                            <Ionicons
                                                name="checkmark-circle"
                                                size={24}
                                                color="#1877F2"
                                            />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
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
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    headerButton: {
        padding: 5,
    },
    headerRightButtons: {
        flexDirection: "row",
        alignItems: "center",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0F2F5",
        margin: 10,
        padding: 8,
        borderRadius: 20,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    filtersContainer: {
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    filtersTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
        color: "#1C1E21",
    },
    filterOption: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    activeFilterOption: {
        backgroundColor: "#E7F3FF",
    },
    filterText: {
        fontSize: 16,
        color: "#1C1E21",
    },
    activeFilterText: {
        color: "#1877F2",
        fontWeight: "500",
    },
    tabsContainer: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    tab: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 12,
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
        fontWeight: "500",
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingVertical: 10,
    },
    groupItem: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
    groupImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    groupInfo: {
        flex: 1,
        marginLeft: 12,
    },
    groupName: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 2,
    },
    groupMembers: {
        fontSize: 13,
        color: "#65676B",
        marginBottom: 2,
    },
    groupDetails: {
        flexDirection: "row",
        alignItems: "center",
    },
    groupPrivacy: {
        fontSize: 13,
        color: "#65676B",
    },
    groupActivity: {
        fontSize: 13,
        color: "#65676B",
        marginLeft: 4,
    },
    notificationBadge: {
        backgroundColor: "#1877F2",
        borderRadius: 10,
        width: 20,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
    },
    joinButton: {
        backgroundColor: "#1877F2",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    joinedButton: {
        backgroundColor: "#E4E6EB",
    },
    joinButtonText: {
        color: "#FFFFFF",
        fontWeight: "500",
    },
    joinedButtonText: {
        color: "#65676B",
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        marginTop: 50,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: "500",
        marginTop: 10,
        textAlign: "center",
    },
    emptySubtitle: {
        fontSize: 14,
        color: "#65676B",
        marginTop: 5,
        textAlign: "center",
    },
    createGroupButton: {
        backgroundColor: "#1877F2",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    createGroupButtonText: {
        color: "#FFFFFF",
        fontWeight: "500",
    },
    floatingButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#1877F2",
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: "80%",
    },
    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    createButton: {
        color: "#1877F2",
        fontSize: 16,
        fontWeight: "bold",
    },
    disabledButton: {
        color: "#BCC0C4",
    },
    modalBody: {
        padding: 15,
    },
    creatorInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    creatorImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    creatorName: {
        fontSize: 16,
        fontWeight: "500",
        marginLeft: 10,
    },
    creatorRole: {
        fontSize: 14,
        color: "#65676B",
        marginLeft: 10,
        backgroundColor: "#E4E6EB",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    groupNameInput: {
        marginBottom: 20,
    },
    groupNameField: {
        borderWidth: 1,
        borderColor: "#E4E6EB",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    privacyContainer: {
        marginBottom: 20,
    },
    privacyHeader: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 10,
    },
    privacyOptions: {
        backgroundColor: "#F0F2F5",
        borderRadius: 8,
    },
    privacyOption: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EB",
    },
    selectedPrivacy: {
        backgroundColor: "#E7F3FF",
    },
    privacyTextContainer: {
        flex: 1,
        marginLeft: 10,
    },
    privacyTitle: {
        fontSize: 16,
        fontWeight: "500",
    },
    selectedPrivacyText: {
        color: "#1877F2",
    },
    privacyDescription: {
        fontSize: 13,
        color: "#65676B",
        marginTop: 2,
    },
});

export default GroupsScreen;
