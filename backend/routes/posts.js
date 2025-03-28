const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
} = require("../controllers/posts");

router.route("/").get(protect, getPosts).post(protect, createPost);

router
    .route("/:id")
    .get(protect, getPost)
    .put(protect, updatePost)
    .delete(protect, deletePost);

router.put("/:id/like", protect, likePost);
router.put("/:id/unlike", protect, unlikePost);

module.exports = router;
