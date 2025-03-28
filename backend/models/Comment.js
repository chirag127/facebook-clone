const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
        required: true,
    },
    text: {
        type: String,
        required: [true, "Please add some text"],
        maxlength: [300, "Comment cannot be more than 300 characters"],
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Comment", CommentSchema);
