const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const connectDB = require("./utils/db");
// Initialize Mongoose connection
connectDB();

const cors = require("cors");
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes configure
const authRoutes = require("./routes/authRoutes");

// Instantiate routes for execution
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to blog-mongoose server,");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
