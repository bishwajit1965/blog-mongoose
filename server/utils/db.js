require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  if (
    !process.env.DB_USER ||
    !process.env.DB_PASSWORD ||
    !process.env.DB_NAME
  ) {
    console.error(
      "Missing required environment variables for database connection."
    );
    process.exit(1);
  }

  try {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l3p6wcn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

    await mongoose.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // serverSelectionTimeoutMS: 5000, // Increase timeout to 5s
    });

    console.log(
      `MongoDB connected successfully to database: ${process.env.DB_NAME}`
    );
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
