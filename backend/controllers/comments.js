const Comment = require("../models/Comment");
const Post = require("../models/Post");

// @desc    Get comments for a post
// @route   GET /api/comments/:postId
// @access  Private
exports.getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ post: req.params.postId })
            .populate({
                path: "user",
                select: "name profilePicture",
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: comments.length,
            data: comments,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single comment
// @route   GET /api/comments/:id
// @access  Private
exports.getComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id).populate({
            path: "user",
            select: "name profilePicture",
        });

        if (!comment) {
            return res.status(404).json({
                success: false,
                error: "Comment not found",
            });
        }

        res.status(200).json({
            success: true,
            data: comment,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Add comment to post
// @route   POST /api/comments/:postId
// @access  Private
exports.addComment = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                error: "Post not found",
            });
        }

        // Create comment
        const comment = await Comment.create({
            text: req.body.text,
            post: req.params.postId,
            user: req.user.id,
        });

        // Add comment to post
        post.comments.push(comment._id);
        await post.save();

        res.status(201).json({
            success: true,
            data: comment,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
exports.updateComment = async (req, res, next) => {
    try {
        let comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                error: "Comment not found",
            });
        }

        // Make sure user is comment owner
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                error: "Not authorized to update this comment",
            });
        }

        comment = await Comment.findByIdAndUpdate(
            req.params.id,
            { text: req.body.text },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: comment,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
exports.deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                error: "Comment not found",
            });
        }

        // Make sure user is comment owner
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                error: "Not authorized to delete this comment",
            });
        }

        // Remove comment from post
        const post = await Post.findById(comment.post);
        if (post) {
            post.comments = post.comments.filter(
                (comm) => comm.toString() !== req.params.id
            );
            await post.save();
        }

        await comment.remove();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Like a comment
// @route   PUT /api/comments/:id/like
// @access  Private
exports.likeComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                error: "Comment not found",
            });
        }

        // Check if the comment has already been liked by this user
        if (comment.likes.includes(req.user.id)) {
            return res.status(400).json({
                success: false,
                error: "Comment already liked",
            });
        }

        comment.likes.push(req.user.id);
        await comment.save();

        res.status(200).json({
            success: true,
            data: comment,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Unlike a comment
// @route   PUT /api/comments/:id/unlike
// @access  Private
exports.unlikeComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                error: "Comment not found",
            });
        }

        // Check if the comment has been liked by this user
        if (!comment.likes.includes(req.user.id)) {
            return res.status(400).json({
                success: false,
                error: "Comment has not yet been liked",
            });
        }

        // Remove the like
        comment.likes = comment.likes.filter(
            (like) => like.toString() !== req.user.id
        );

        await comment.save();

        res.status(200).json({
            success: true,
            data: comment,
        });
    } catch (err) {
        next(err);
    }
};
