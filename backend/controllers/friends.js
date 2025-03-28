const User = require("../models/User");

// @desc    Get user's friends
// @route   GET /api/friends
// @access  Private
exports.getFriends = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: "friends",
            select: "name email profilePicture",
        });

        res.status(200).json({
            success: true,
            count: user.friends.length,
            data: user.friends,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get user's friend requests
// @route   GET /api/friends/requests
// @access  Private
exports.getFriendRequests = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: "friendRequests",
            select: "name email profilePicture",
        });

        res.status(200).json({
            success: true,
            count: user.friendRequests.length,
            data: user.friendRequests,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Send friend request
// @route   POST /api/friends/request/:id
// @access  Private
exports.sendFriendRequest = async (req, res, next) => {
    try {
        // Check if user exists
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found",
            });
        }

        // Check if user is trying to add themselves
        if (req.params.id === req.user.id) {
            return res.status(400).json({
                success: false,
                error: "You cannot send a friend request to yourself",
            });
        }

        // Check if user is already a friend
        if (user.friends.includes(req.user.id)) {
            return res.status(400).json({
                success: false,
                error: "User is already your friend",
            });
        }

        // Check if friend request already sent
        if (user.friendRequests.includes(req.user.id)) {
            return res.status(400).json({
                success: false,
                error: "Friend request already sent",
            });
        }

        // Add to friend requests
        user.friendRequests.push(req.user.id);
        await user.save();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Accept friend request
// @route   PUT /api/friends/accept/:id
// @access  Private
exports.acceptFriendRequest = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.user.id);
        const requestUser = await User.findById(req.params.id);

        if (!requestUser) {
            return res.status(404).json({
                success: false,
                error: "User not found",
            });
        }

        // Check if there is a friend request
        if (!currentUser.friendRequests.includes(req.params.id)) {
            return res.status(400).json({
                success: false,
                error: "No friend request from this user",
            });
        }

        // Add to friends list for both users
        currentUser.friends.push(req.params.id);
        requestUser.friends.push(req.user.id);

        // Remove from friend requests
        currentUser.friendRequests = currentUser.friendRequests.filter(
            (id) => id.toString() !== req.params.id
        );

        await currentUser.save();
        await requestUser.save();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Reject friend request
// @route   PUT /api/friends/reject/:id
// @access  Private
exports.rejectFriendRequest = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.user.id);

        // Check if there is a friend request
        if (!currentUser.friendRequests.includes(req.params.id)) {
            return res.status(400).json({
                success: false,
                error: "No friend request from this user",
            });
        }

        // Remove from friend requests
        currentUser.friendRequests = currentUser.friendRequests.filter(
            (id) => id.toString() !== req.params.id
        );

        await currentUser.save();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Remove friend
// @route   DELETE /api/friends/:id
// @access  Private
exports.removeFriend = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.user.id);
        const friend = await User.findById(req.params.id);

        if (!friend) {
            return res.status(404).json({
                success: false,
                error: "User not found",
            });
        }

        // Check if they are friends
        if (!currentUser.friends.includes(req.params.id)) {
            return res.status(400).json({
                success: false,
                error: "This user is not your friend",
            });
        }

        // Remove from friends list for both users
        currentUser.friends = currentUser.friends.filter(
            (id) => id.toString() !== req.params.id
        );
        friend.friends = friend.friends.filter(
            (id) => id.toString() !== req.user.id
        );

        await currentUser.save();
        await friend.save();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        next(err);
    }
};
