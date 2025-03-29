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

// @desc    Get suggested friends
// @route   GET /api/users/suggested
// @access  Private
exports.getSuggestedFriends = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.user.id).populate('friends');

        // Get users who are not friends and not in friend requests
        const suggestedUsers = await User.find({
            _id: {
                $nin: [
                    req.user.id,
                    ...currentUser.friends.map(f => f._id),
                    ...currentUser.friendRequests
                ]
            }
        }).select('name email profilePicture location');

        // Calculate mutual friends for each suggested user
        const suggestedUsersWithMutual = await Promise.all(
            suggestedUsers.map(async (user) => {
                const userWithFriends = await User.findById(user._id).populate('friends');
                const mutualFriends = userWithFriends.friends.filter(friend =>
                    currentUser.friends.some(myFriend => myFriend._id.toString() === friend._id.toString())
                ).length;

                return {
                    ...user.toObject(),
                    mutualFriends
                };
            })
        );

        // Sort by number of mutual friends
        const sortedSuggestions = suggestedUsersWithMutual.sort((a, b) => b.mutualFriends - a.mutualFriends);

        res.status(200).json({
            success: true,
            count: sortedSuggestions.length,
            data: sortedSuggestions
        });
    } catch (err) {
        next(err);
    }
};
