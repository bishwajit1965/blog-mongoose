const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./utils/db");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const path = require("path");
const morgan = require("morgan");
const onlineUsers = new Set();
const cookie = require("cookie");
const http = require("http"); // Import HTTP module
const { Server } = require("socket.io"); // Import Socket.io

// Initializes Mongoose connection
connectDB();

const server = http.createServer(app); // Create HTTP server

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const port = process.env.PORT || 3000;

// MIDDLEWARES
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// Logs concise output to the console
app.use(morgan("dev"));
// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(cookieParser());

// Routes configured and called
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const roleRoutes = require("./routes/roleRoutes");
const permissionRoutes = require("./routes/permissionRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const tagRoutes = require("./routes/tagRoutes");
const userManagementRoutes = require("./routes/userManagementRoutes");
const profileRoutes = require("./routes/profileRoutes");
const blogRoutes = require("./routes/blogRoutes");
const adminStatsRoutes = require("./routes/adminStatsRoutes");
const blogStatusRoutes = require("./routes/blogStatusRoutes");
const comingSoonRoutes = require("./routes/comingSoonRoutes");
const scheduledPostsRoutes = require("./routes/scheduledPostsRoutes");

// Instantiate routes for execution
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/admin/users", userManagementRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api", adminStatsRoutes);
app.use("/api/blog", blogStatusRoutes);
app.use("/api/posts", comingSoonRoutes);
app.use("/api/scheduled", scheduledPostsRoutes);

// WebSocket for real-time user presence tracking
io.on("connection", (socket) => {
  console.log("🔗 A user connected");
  // Emit event on publish alert (this is your backend trigger for front-end notification)
  socket.emit("publish-alert", "This is a test message");

  if (!socket.request.headers.cookie) {
    console.log("❌ No cookies found in request");
    return;
  }

  // Parse cookies
  const cookies = cookie.parse(socket.request.headers.cookie);
  console.log("🍪 Received Cookies:", cookies); // Debugging

  const token = cookies.refreshToken; // Using 'refreshToken' instead of 'authToken'
  if (!token) {
    console.log("❌ No token found in cookies");
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token Decoded:", decoded);
    const userId = decoded.id;

    if (userId) {
      console.log(`🟢 User ${userId} is now online`);
      onlineUsers.add(userId);
      io.emit("update-users", Array.from(onlineUsers));
    }

    socket.on("disconnect", () => {
      console.log(`🔴 User ${userId} disconnected`);
      onlineUsers.delete(userId);
      io.emit("update-users", Array.from(onlineUsers));
    });
  } catch (err) {
    console.log("❌ Token Verification Failed:", err.message);
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to blog-mongoose server,");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error", err.message);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal server error." });
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected successfully.");
  } catch (error) {
    console.log("Error while disconnecting MongoDB.", error.message);
  }
  process.exit(0);
});

// Export io for use in other parts of your app
module.exports = { app, server, io };
// cronJobs should be required after io export
require("./jobs/cronJobs");

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
