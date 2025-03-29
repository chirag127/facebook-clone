import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";

const TestComponent = () => {
    const [isStorageAvailable, setIsStorageAvailable] = useState(false);
    const [storedValue, setStoredValue] = useState(null);
    const [apiResponse, setApiResponse] = useState(null);
    const [apiError, setApiError] = useState(null);

    useEffect(() => {
        // Check if localStorage is available
        try {
            if (typeof localStorage !== "undefined") {
                setIsStorageAvailable(true);

                // Try to store and retrieve a value
                localStorage.setItem("test-key", "test-value");
                const value = localStorage.getItem("test-key");
                setStoredValue(value);
            }
        } catch (error) {
            console.error("Storage test error:", error);
        }
    }, []);

    const testApiConnection = async () => {
        try {
            setApiError(null);
            const response = await axios.get("http://localhost:5000/api/test");
            console.log("API response:", response.data);
            setApiResponse(response.data);
        } catch (error) {
            console.error("API test error:", error);
            setApiError(error.message || "Failed to connect to API");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Storage Test</Text>
            <Text>Storage Available: {isStorageAvailable ? "Yes" : "No"}</Text>
            <Text>Stored Value: {storedValue || "None"}</Text>

            <View style={styles.divider} />

            <Text style={styles.title}>API Test</Text>
            <TouchableOpacity style={styles.button} onPress={testApiConnection}>
                <Text style={styles.buttonText}>Test API Connection</Text>
            </TouchableOpacity>

            {apiResponse && (
                <View style={styles.responseContainer}>
                    <Text>Status: Success</Text>
                    <Text>Message: {apiResponse.message}</Text>
                    <Text>Time: {apiResponse.timestamp}</Text>
                </View>
            )}

            {apiError && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Error: {apiError}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        margin: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10,
    },
    divider: {
        height: 1,
        backgroundColor: "#ccc",
        marginVertical: 15,
    },
    button: {
        backgroundColor: "#1877F2",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginVertical: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    responseContainer: {
        backgroundColor: "#e6f7ff",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    errorContainer: {
        backgroundColor: "#ffebee",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    errorText: {
        color: "#d32f2f",
    },
});

export default TestComponent;
