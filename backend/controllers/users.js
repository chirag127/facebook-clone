const User = require("../models/User");

// @desc    Get all users
// @route   GET /api/users
// @access  Private
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Search users
// @route   GET /api/users/search
// @access  Private
exports.searchUsers = async (req, res, next) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                success: false,
                error: "Please provide a search query",
            });
        }

        const users = await User.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } },
            ],
            _id: { $ne: req.user.id }, // Exclude current user
        }).select("-password");

        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update profile picture
// @route   PUT /api/users/profile-picture
// @access  Private
exports.updateProfilePicture = async (req, res, next) => {
    try {
        let profilePicture = req.body.profilePicture;

        // If file was uploaded
        if (req.file) {
            // Create URL for the uploaded file
            const baseUrl = `${req.protocol}://${req.get("host")}`;
            profilePicture = `${baseUrl}/uploads/${req.file.filename}`;
        }

        if (!profilePicture) {
            return res.status(400).json({
                success: false,
                error: "Please provide a profile picture URL or upload an image",
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { profilePicture },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update cover photo
// @route   PUT /api/users/cover-photo
// @access  Private
exports.updateCoverPhoto = async (req, res, next) => {
    try {
        let coverPhoto = req.body.coverPhoto;

        // If file was uploaded
        if (req.file) {
            // Create URL for the uploaded file
            const baseUrl = `${req.protocol}://${req.get("host")}`;
            coverPhoto = `${baseUrl}/uploads/${req.file.filename}`;
        }

        if (!coverPhoto) {
            return res.status(400).json({
                success: false,
                error: "Please provide a cover photo URL or upload an image",
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { coverPhoto },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err) {
        next(err);
    }
};
