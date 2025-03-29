import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
// const API_URL = "http://localhost:5000/api"; // Use localhost for development
const API_URL = "https://facebook-clone-qf4b.onrender.com/api"; // Use production URL for deployment

// Create a storage wrapper that works on both web and mobile
const secureStorage = {
    setItem: async (key, value) => {
        try {
            // Use localStorage for web
            if (typeof localStorage !== "undefined") {
                localStorage.setItem(key, value);
                return;
            }

            // For mobile, we would use SecureStore, but we'll skip for now
            console.log(`Storing ${key} in secure storage`);
        } catch (error) {
            console.log("Storage setItem error:", error);
        }
    },
    getItem: async (key) => {
        try {
            // Use localStorage for web
            if (typeof localStorage !== "undefined") {
                return localStorage.getItem(key);
            }

            // For mobile, we would use SecureStore, but we'll skip for now
            console.log(`Getting ${key} from secure storage`);
            return null;
        } catch (error) {
            console.log("Storage getItem error:", error);
            return null;
        }
    },
    deleteItem: async (key) => {
        try {
            // Use localStorage for web
            if (typeof localStorage !== "undefined") {
                localStorage.removeItem(key);
                return;
            }

            // For mobile, we would use SecureStore, but we'll skip for now
            console.log(`Removing ${key} from secure storage`);
        } catch (error) {
            console.log("Storage deleteItem error:", error);
        }
    },
};

export const AuthContext = createContext();

// // Determine the API URL based on platform


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
                setUserInfo,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
