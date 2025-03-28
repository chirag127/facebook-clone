const Post = require("../models/Post");
const User = require("../models/User");

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

        const post = await Post.create(req.body);

        res.status(201).json({
            success: true,
            data: post,
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

        await post.remove();

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
