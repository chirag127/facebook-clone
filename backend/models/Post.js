const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: [true, "Please add some text"],
        maxlength: [500, "Text cannot be more than 500 characters"],
    },
    image: {
        type: String,
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
    ],
    comments: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Comment",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Post", PostSchema);
