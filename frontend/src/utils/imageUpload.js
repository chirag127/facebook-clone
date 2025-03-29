import * as ImagePicker from "expo-image-picker";

// Request permission to access the camera roll
export const requestMediaLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === "granted";
};

// Pick an image from the camera roll
export const pickImage = async (options = {}) => {
    try {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            ...options,
        });

        if (!result.canceled) {
            return result.assets[0].uri;
        }
        return null;
    } catch (error) {
        console.log("Error picking image:", error);
        return null;
    }
};

// Create form data for image upload
export const createFormData = (uri, name = "image") => {
    const filename = uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : "image";

    const formData = new FormData();
    formData.append(name, {
        uri,
        name: filename,
        type,
    });

    return formData;
};
