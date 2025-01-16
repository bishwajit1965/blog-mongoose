const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const connectDB = require("./utils/db");

// Initialize Mongoose connection
connectDB();

const port = process.env.PORT || 3000;

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies to be sent
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes configured
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Instantiate routes for execution
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);

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
  await mongoose.disconnect();
  process.exit(0);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
