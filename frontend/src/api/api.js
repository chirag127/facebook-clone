import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://10.0.2.2:5000/api"; // For Android emulator

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync("userToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Posts API
export const getPosts = () => api.get("/posts");
export const getPost = (id) => api.get(`/posts/${id}`);
export const createPost = (postData) => api.post("/posts", postData);
export const updatePost = (id, postData) => api.put(`/posts/${id}`, postData);
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const likePost = (id) => api.put(`/posts/${id}/like`);
export const unlikePost = (id) => api.put(`/posts/${id}/unlike`);

// Comments API
export const getComments = (postId) => api.get(`/comments/${postId}`);
export const addComment = (postId, commentData) =>
    api.post(`/comments/${postId}`, commentData);
export const updateComment = (id, commentData) =>
    api.put(`/comments/${id}`, commentData);
export const deleteComment = (id) => api.delete(`/comments/${id}`);
export const likeComment = (id) => api.put(`/comments/${id}/like`);
export const unlikeComment = (id) => api.put(`/comments/${id}/unlike`);

// User API
export const getUsers = () => api.get("/users");
export const getUser = (id) => api.get(`/users/${id}`);
export const updateProfilePicture = (imageUrl) =>
    api.put("/users/profile-picture", { profilePicture: imageUrl });
export const updateCoverPhoto = (imageUrl) =>
    api.put("/users/cover-photo", { coverPhoto: imageUrl });
export const updateUserDetails = (userData) =>
    api.put("/auth/updatedetails", userData);
export const updatePassword = (passwordData) =>
    api.put("/auth/updatepassword", passwordData);

// Friends API
export const getFriends = () => api.get("/friends");
export const getFriendRequests = () => api.get("/friends/requests");
export const sendFriendRequest = (userId) =>
    api.post(`/friends/request/${userId}`);
export const acceptFriendRequest = (userId) =>
    api.put(`/friends/accept/${userId}`);
export const rejectFriendRequest = (userId) =>
    api.put(`/friends/reject/${userId}`);
export const removeFriend = (userId) => api.delete(`/friends/${userId}`);

export default api;
