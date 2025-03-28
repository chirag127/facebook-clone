const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
    getFriends,
    getFriendRequests,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
} = require("../controllers/friends");

router.get("/", protect, getFriends);
router.get("/requests", protect, getFriendRequests);
router.post("/request/:id", protect, sendFriendRequest);
router.put("/accept/:id", protect, acceptFriendRequest);
router.put("/reject/:id", protect, rejectFriendRequest);
router.delete("/:id", protect, removeFriend);

module.exports = router;
