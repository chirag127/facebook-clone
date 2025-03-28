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

// @desc    Update profile picture
// @route   PUT /api/users/profile-picture
// @access  Private
exports.updateProfilePicture = async (req, res, next) => {
    try {
        // In a real app, you would handle file upload here
        // For simplicity, we're just updating the URL
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { profilePicture: req.body.profilePicture },
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
        // In a real app, you would handle file upload here
        // For simplicity, we're just updating the URL
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { coverPhoto: req.body.coverPhoto },
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
