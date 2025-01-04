const express = require("express");
const app = express();
const connectDB = require("./utils/db");
// Initialize Mongoose connection
connectDB();

const cors = require("cors");
let cookieParser = require("cookie-parser");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to blog-mongoose server,");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
