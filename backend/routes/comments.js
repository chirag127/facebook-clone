const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
    getComments,
    getComment,
    addComment,
    updateComment,
    deleteComment,
    likeComment,
    unlikeComment,
} = require("../controllers/comments");

router.route("/:postId").get(protect, getComments).post(protect, addComment);

router
    .route("/:id")
    .get(protect, getComment)
    .put(protect, updateComment)
    .delete(protect, deleteComment);

router.put("/:id/like", protect, likeComment);
router.put("/:id/unlike", protect, unlikeComment);

module.exports = router;
