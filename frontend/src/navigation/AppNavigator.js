import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";

// Auth Screens
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

// Main Screens
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FriendsScreen from "../screens/FriendsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import MenuScreen from "../screens/MenuScreen";
import PostDetailScreen from "../screens/PostDetailScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import UserProfileScreen from "../screens/UserProfileScreen";

// Menu Screens
import SavedScreen from "../screens/SavedScreen";
import GroupsScreen from "../screens/GroupsScreen";
import MarketplaceScreen from "../screens/MarketplaceScreen";
import MemoriesScreen from "../screens/MemoriesScreen";
import PagesScreen from "../screens/PagesScreen";
import EventsScreen from "../screens/EventsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HelpScreen from "../screens/HelpScreen";

// Context
import { AuthContext } from "../context/AuthContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Define linking configuration for deep links
const linking = {
  prefixes: ['https://fbclone.com', 'fbclone://'],
  config: {
    screens: {
      Home: {
        screens: {
          HomeScreen: 'home',
          PostDetail: {
            path: 'post/:postId',
            parse: {
              postId: (postId) => postId,
            },
          },
          UserProfile: {
            path: 'user/:userId',
            parse: {
              userId: (userId) => userId,
            },
          },
        },
      },
      Profile: {
        screens: {
          ProfileScreen: 'profile',
          EditProfile: 'profile/edit',
        },
      },
      Friends: 'friends',
      Notifications: 'notifications',
      Menu: {
        screens: {
          MenuScreen: 'menu',
          Saved: 'saved',
          Groups: 'groups',
          Marketplace: 'marketplace',
          Memories: 'memories',
          Pages: 'pages',
          Events: 'events',
          Settings: 'settings',
          Help: 'help',
        },
      },
      Login: 'login',
      Register: 'register',
    },
  },
  // Custom function to handle deep links outside of react-navigation
  async getInitialURL() {
    // First, check if the app was opened from a deep link
    const url = await Linking.getInitialURL();
    if (url != null) {
      return url;
    }

    // Check for URL in the bundle URL
    return null;
  },
  // Custom function to subscribe to incoming links
  subscribe(listener) {
    // Listen to incoming links
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      listener(url);
    });

    return () => {
      // Clean up subscription when the component is unmounted
      linkingSubscription.remove();
    };
  },
};

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PostDetail"
                component={PostDetailScreen}
                options={{ title: "Post" }}
            />
            <Stack.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={{ title: "Profile" }}
            />
        </Stack.Navigator>
    );
};

const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{ title: "Edit Profile" }}
            />
        </Stack.Navigator>
    );
};

const MenuStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MenuScreen" component={MenuScreen} />
            <Stack.Screen name="Saved" component={SavedScreen} />
            <Stack.Screen name="Groups" component={GroupsScreen} />
            <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
            <Stack.Screen name="Memories" component={MemoriesScreen} />
            <Stack.Screen name="Pages" component={PagesScreen} />
            <Stack.Screen name="Events" component={EventsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Help" component={HelpScreen} />
        </Stack.Navigator>
    );
};

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Friends") {
                        iconName = focused ? "people" : "people-outline";
                    } else if (route.name === "Profile") {
                        iconName = focused ? "person" : "person-outline";
                    } else if (route.name === "Notifications") {
                        iconName = focused
                            ? "notifications"
                            : "notifications-outline";
                    } else if (route.name === "Menu") {
                        iconName = focused ? "menu" : "menu-outline";
                    }

                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
                tabBarActiveTintColor: "#1877F2",
                tabBarInactiveTintColor: "#65676B",
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: "#E4E6EB",
                    elevation: 8,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                    height: 55,
                    paddingBottom: 5,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{ headerShown: false }}
            />
            <Tab.Screen name="Friends" component={FriendsScreen} />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{ headerShown: false }}
            />
            <Tab.Screen name="Notifications" component={NotificationsScreen} />
            <Tab.Screen
                name="Menu"
                component={MenuStack}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
};

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
};

const AppNavigator = () => {
    const { userToken, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return null; // Or a loading screen
    }

    return (
        <NavigationContainer linking={linking}>
            {userToken !== null ? <MainTabNavigator /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default AppNavigator;
