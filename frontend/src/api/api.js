import axios from "axios";
// Determine the API URL based on platform
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

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
    async (config) => {
        const token = await secureStorage.getItem("userToken");
        console.log("Token from storage:", token);
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
export const createPost = (postData) => {
    // If postData contains an image URI, create FormData
    if (
        postData.image &&
        typeof postData.image === "string" &&
        postData.image.startsWith("file://")
    ) {
        const formData = new FormData();
        formData.append("text", postData.text);

        // Append image file
        const filename = postData.image.split("/").pop();
        const match = /\.([\w]+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : "image";

        formData.append("image", {
            uri: postData.image,
            name: filename,
            type,
        });

        return api.post("/posts", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    // Regular JSON post
    return api.post("/posts", postData);
};
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
export const searchUsers = (query) => api.get(`/users/search?query=${query}`);

export const updateProfilePicture = (imageUri) => {
    // If it's a local file URI, create FormData
    if (typeof imageUri === "string" && imageUri.startsWith("file://")) {
        const formData = new FormData();

        // Append image file
        const filename = imageUri.split("/").pop();
        const match = /\.([\w]+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : "image";

        formData.append("profilePicture", {
            uri: imageUri,
            name: filename,
            type,
        });

        return api.put("/users/profile-picture", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    // Regular JSON update with URL
    return api.put("/users/profile-picture", { profilePicture: imageUri });
};

export const updateCoverPhoto = (imageUri) => {
    // If it's a local file URI, create FormData
    if (typeof imageUri === "string" && imageUri.startsWith("file://")) {
        const formData = new FormData();

        // Append image file
        const filename = imageUri.split("/").pop();
        const match = /\.([\w]+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : "image";

        formData.append("coverPhoto", {
            uri: imageUri,
            name: filename,
            type,
        });

        return api.put("/users/cover-photo", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    // Regular JSON update with URL
    return api.put("/users/cover-photo", { coverPhoto: imageUri });
};

export const updateUserDetails = (userData) =>
    api.put("/auth/updatedetails", userData);
export const updatePassword = (passwordData) =>
    api.put("/auth/updatepassword", passwordData);

// Friends API
export const getFriends = () => api.get("/friends");
export const getFriendRequests = () => api.get("/friends/requests");
export const getSuggestedFriends = () => api.get("/users/suggested");
export const sendFriendRequest = (userId) =>
    api.post(`/friends/request/${userId}`);
export const acceptFriendRequest = (userId) =>
    api.put(`/friends/accept/${userId}`);
export const rejectFriendRequest = (userId) =>
    api.put(`/friends/reject/${userId}`);
export const removeFriend = (userId) => api.delete(`/friends/${userId}`);

export default api;
