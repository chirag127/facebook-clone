import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Navigation
import AppNavigator from "./src/navigation/AppNavigator";

// Context
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <StatusBar style="auto" />
                <AppNavigator />
            </AuthProvider>
        </SafeAreaProvider>
    );
}
