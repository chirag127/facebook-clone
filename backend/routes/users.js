const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
    getUsers,
    getUser,
    searchUsers,
    updateProfilePicture,
    updateCoverPhoto,
} = require("../controllers/users");

router.get("/", protect, getUsers);
router.get("/search", protect, searchUsers);
router.get("/:id", protect, getUser);
router.put(
    "/profile-picture",
    protect,
    upload.single("profilePicture"),
    updateProfilePicture
);
router.put(
    "/cover-photo",
    protect,
    upload.single("coverPhoto"),
    updateCoverPhoto
);

module.exports = router;
