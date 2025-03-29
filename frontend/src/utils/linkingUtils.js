import { Linking, Platform, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";

// Base URL for deep links
const BASE_WEB_URL = "https://fbclone.com";
const BASE_APP_URL = "fbclone://";

/**
 * Generate a shareable URL for various content types
 * @param {string} type - Type of content (post, profile, etc.)
 * @param {object} params - Parameters for the link
 * @returns {string} - Formatted URL for sharing
 */
export const generateShareableUrl = (type, params = {}) => {
    let path = "";

    switch (type) {
        case "post":
            path = `post/${params.postId}`;
            break;
        case "profile":
            path = `user/${params.userId}`;
            break;
        case "marketplace":
            path = `marketplace${
                params.productId ? `/product/${params.productId}` : ""
            }`;
            break;
        case "event":
            path = `events/${params.eventId}`;
            break;
        case "group":
            path = `groups/${params.groupId}`;
            break;
        default:
            path = "";
    }

    return `${BASE_WEB_URL}/${path}`;
};

/**
 * Check if the app can handle a given URL
 * @param {string} url - URL to check
 * @returns {Promise<boolean>} - Whether the URL can be opened
 */
export const canOpenURL = async (url) => {
    try {
        return await Linking.canOpenURL(url);
    } catch (error) {
        console.error("Error checking if URL can be opened:", error);
        return false;
    }
};

/**
 * Open a URL - will open in app if it's a deep link, or in browser if external
 * @param {string} url - URL to open
 */
export const openURL = async (url) => {
    try {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert("Error", `Cannot open URL: ${url}`);
        }
    } catch (error) {
        Alert.alert(
            "Error",
            "Something went wrong when trying to open the link"
        );
    }
};

/**
 * Share content via the device's share dialog
 * @param {object} options - Sharing options
 * @param {string} options.title - Title of the content to share
 * @param {string} options.message - Message to include in the share
 * @param {string} options.url - URL to share
 */
export const shareContent = async ({ title, message, url }) => {
    try {
        if (Platform.OS === "web") {
            // Web implementation using navigator.share if available
            if (navigator.share) {
                await navigator.share({
                    title,
                    text: message,
                    url,
                });
            } else {
                // Fallback for browsers without share API
                await Clipboard.setStringAsync(url);
                Alert.alert("Link Copied", "Link has been copied to clipboard");
            }
        } else {
            // React Native implementation
            const content = {
                title,
                message: `${message} ${url}`,
            };

            // If we have the Share API available
            if (Platform.OS === "ios" || Platform.OS === "android") {
                const { Share } = require("react-native");
                await Share.share(content);
            } else {
                // Fallback
                await Clipboard.setStringAsync(url);
                Alert.alert("Link Copied", "Link has been copied to clipboard");
            }
        }
    } catch (error) {
        console.error("Error sharing content:", error);
        Alert.alert("Error", "Failed to share content");
    }
};

/**
 * Create a deep link for internal app navigation
 * @param {string} screen - Screen to navigate to
 * @param {object} params - Navigation parameters
 */
export const createDeepLink = (screen, params = {}) => {
    let path = "";

    switch (screen) {
        case "HomeScreen":
            path = "home";
            break;
        case "PostDetail":
            path = `post/${params.postId}`;
            break;
        case "UserProfile":
            path = `user/${params.userId}`;
            break;
        case "Marketplace":
            path = "marketplace";
            break;
        case "Events":
            path = "events";
            break;
        default:
            path = screen.toLowerCase();
    }

    return `${BASE_APP_URL}/${path}`;
};
