const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
    getUsers,
    getUser,
    updateProfilePicture,
    updateCoverPhoto,
} = require("../controllers/users");

router.get("/", protect, getUsers);
router.get("/:id", protect, getUser);
router.put("/profile-picture", protect, updateProfilePicture);
router.put("/cover-photo", protect, updateCoverPhoto);

module.exports = router;
