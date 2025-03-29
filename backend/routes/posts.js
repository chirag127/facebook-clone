const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
} = require("../controllers/posts");

router
    .route("/")
    .get(protect, getPosts)
    .post(protect, upload.single("image"), createPost);

router
    .route("/:id")
    .get(protect, getPost)
    .put(protect, upload.single("image"), updatePost)
    .delete(protect, deletePost);

router.put("/:id/like", protect, likePost);
router.put("/:id/unlike", protect, unlikePost);

module.exports = router;
