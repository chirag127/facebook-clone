const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
            .populate({
                path: "user",
                select: "name profilePicture",
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Private
exports.getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate({
                path: "user",
                select: "name profilePicture",
            })
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "name profilePicture",
                },
            });

        if (!post) {
            return res.status(404).json({
                success: false,
                error: "Post not found",
            });
        }

        res.status(200).json({
            success: true,
            data: post,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res, next) => {
    try {
        // Add user to req.body
        req.body.user = req.user.id;

        // If file was uploaded
        if (req.file) {
            // Create URL for the uploaded file
            const baseUrl = `${req.protocol}://${req.get("host")}`;
            req.body.image = `${baseUrl}/uploads/${req.file.filename}`;
        }

        const post = await Post.create(req.body);

        // Populate user info for the response
        const populatedPost = await Post.findById(post._id).populate({
            path: "user",
            select: "name profilePicture",
        });

        res.status(201).json({
            success: true,
            data: populatedPost,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
exports.updatePost = async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                error: "Post not found",
            });
        }

        // Make sure user is post owner
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                error: "Not authorized to update this post",
            });
        }

        post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: post,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                error: "Post not found",
            });
        }

        // Make sure user is post owner
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                error: "Not authorized to delete this post",
            });
        }

        // Delete all comments associated with the post
        await Comment.deleteMany({ post: post._id });

        // Delete the post
        await Post.findByIdAndDelete(post._id);

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Like a post
// @route   PUT /api/posts/:id/like
// @access  Private
exports.likePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                error: "Post not found",
            });
        }

        // Check if the post has already been liked by this user
        if (post.likes.includes(req.user.id)) {
            return res.status(400).json({
                success: false,
                error: "Post already liked",
            });
        }

        post.likes.push(req.user.id);
        await post.save();

        res.status(200).json({
            success: true,
            data: post,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Unlike a post
// @route   PUT /api/posts/:id/unlike
// @access  Private
exports.unlikePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                error: "Post not found",
            });
        }

        // Check if the post has been liked by this user
        if (!post.likes.includes(req.user.id)) {
            return res.status(400).json({
                success: false,
                error: "Post has not yet been liked",
            });
        }

        // Remove the like
        post.likes = post.likes.filter(
            (like) => like.toString() !== req.user.id
        );

        await post.save();

        res.status(200).json({
            success: true,
            data: post,
        });
    } catch (err) {
        next(err);
    }
};
