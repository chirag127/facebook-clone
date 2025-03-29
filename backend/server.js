const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const auth = require("./routes/auth");
const users = require("./routes/users");
const posts = require("./routes/posts");
const comments = require("./routes/comments");
const friends = require("./routes/friends");

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "uploads")));

// Create uploads directory if it doesn't exist
app.use("/uploads", express.static("uploads"));

// Mount routers
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/comments", comments);
app.use("/api/friends", friends);

// Basic route for testing
app.get("/", (req, res) => {
    res.send("Facebook Clone API is running...");
});

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
