import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

// Create a wrapper for SecureStore to handle API changes
const secureStorage = {
    setItem: async (key, value) => {
        try {
            return await SecureStore.setItemAsync(key, value);
        } catch (error) {
            console.log("SecureStore setItem error:", error);
        }
    },
    getItem: async (key) => {
        try {
            return await SecureStore.getItemAsync(key);
        } catch (error) {
            console.log("SecureStore getItem error:", error);
            return null;
        }
    },
    deleteItem: async (key) => {
        try {
            return await SecureStore.deleteItemAsync(key);
        } catch (error) {
            console.log("SecureStore deleteItem error:", error);
        }
    },
};
import axios from "axios";

export const AuthContext = createContext();

// const API_URL = "http://10.0.2.2:5000/api"; // For Android emulator

// const API_URL = "http://localhost:5000/api"; // For iOS simulator or physical device

const API_URL =  "http://192.168.31.232:5000/api";

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password,
            });

            const { token } = response.data;
            setUserToken(token);

            // Get user info
            const userResponse = await axios.get(`${API_URL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUserInfo(userResponse.data.data);

            // Store token in secure storage
            await secureStorage.setItem("userToken", token);
            await secureStorage.setItem(
                "userInfo",
                JSON.stringify(userResponse.data.data)
            );
        } catch (error) {
            setError(
                error.response?.data?.error || "An error occurred during login"
            );
            console.log("Login error:", error);
        }

        setIsLoading(false);
    };

    const register = async (name, email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_URL}/auth/register`, {
                name,
                email,
                password,
            });

            const { token } = response.data;
            setUserToken(token);

            // Get user info
            const userResponse = await axios.get(`${API_URL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUserInfo(userResponse.data.data);

            // Store token in secure storage
            await secureStorage.setItem("userToken", token);
            await secureStorage.setItem(
                "userInfo",
                JSON.stringify(userResponse.data.data)
            );
        } catch (error) {
            setError(
                error.response?.data?.error ||
                    "An error occurred during registration"
            );
            console.log("Registration error:", error);
        }

        setIsLoading(false);
    };

    const logout = async () => {
        setIsLoading(true);
        setUserToken(null);
        setUserInfo(null);

        await secureStorage.deleteItem("userToken");
        await secureStorage.deleteItem("userInfo");

        setIsLoading(false);
    };

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);

            let userToken = await secureStorage.getItem("userToken");
            let userInfo = await secureStorage.getItem("userInfo");

            if (userInfo) {
                userInfo = JSON.parse(userInfo);
            }

            if (userToken) {
                setUserToken(userToken);
                setUserInfo(userInfo);
            }

            setIsLoading(false);
        } catch (e) {
            console.log("isLogged in error:", e);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                login,
                register,
                logout,
                isLoading,
                userToken,
                userInfo,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
