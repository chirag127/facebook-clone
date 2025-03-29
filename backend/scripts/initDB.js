const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const bcrypt = require("bcryptjs");

// Load env vars
dotenv.config({ path: "../.env" });

// Connect to database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Create sample users
const createUsers = async () => {
    try {
        // Clear existing data
        await User.deleteMany();
        await Post.deleteMany();
        await Comment.deleteMany();

        console.log("Previous data cleared");

        // Create users
        const password = await bcrypt.hash("password123", 10);

        const john = await User.create({
            name: "John Doe",
            email: "john@example.com",
            password,
            bio: "Software developer and tech enthusiast",
            location: "New York",
            birthday: new Date("1990-01-15"),
        });

        const jane = await User.create({
            name: "Jane Smith",
            email: "jane@example.com",
            password,
            bio: "Digital marketer and social media expert",
            location: "San Francisco",
            birthday: new Date("1992-05-22"),
        });

        const bob = await User.create({
            name: "Bob Johnson",
            email: "bob@example.com",
            password,
            bio: "Photographer and travel blogger",
            location: "Chicago",
            birthday: new Date("1988-11-07"),
        });

        // Make them friends
        john.friends.push(jane._id);
        john.friends.push(bob._id);
        await john.save();

        jane.friends.push(john._id);
        jane.friends.push(bob._id);
        await jane.save();

        bob.friends.push(john._id);
        bob.friends.push(jane._id);
        await bob.save();

        // Create posts
        const post1 = await Post.create({
            user: john._id,
            text: "Hello world! This is my first post on Facebook Clone.",
            image: "https://source.unsplash.com/random/800x600/?nature",
        });

        const post2 = await Post.create({
            user: jane._id,
            text: "Just finished a great book. Would highly recommend!",
        });

        const post3 = await Post.create({
            user: bob._id,
            text: "Check out this amazing sunset I captured yesterday!",
            image: "https://source.unsplash.com/random/800x600/?sunset",
        });

        // Create comments
        const comment1 = await Comment.create({
            user: jane._id,
            post: post1._id,
            text: "Welcome to the platform, John!",
        });

        const comment2 = await Comment.create({
            user: bob._id,
            post: post1._id,
            text: "Great to see you here!",
        });

        const comment3 = await Comment.create({
            user: john._id,
            post: post2._id,
            text: "What book was it? I need recommendations.",
        });

        // Add comments to posts
        post1.comments.push(comment1._id);
        post1.comments.push(comment2._id);
        await post1.save();

        post2.comments.push(comment3._id);
        await post2.save();

        // Add likes
        post1.likes.push(jane._id);
        post1.likes.push(bob._id);
        await post1.save();

        post2.likes.push(john._id);
        post2.likes.push(bob._id);
        await post2.save();

        post3.likes.push(john._id);
        post3.likes.push(jane._id);
        await post3.save();

        console.log("Sample data created successfully");
        process.exit(0);
    } catch (error) {
        console.error("Error creating sample data:", error);
        process.exit(1);
    }
};

createUsers();
