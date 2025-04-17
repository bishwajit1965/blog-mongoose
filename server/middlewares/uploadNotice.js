const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Target: /uploads/notifications
const uploadDir = path.join(__dirname, "../uploads/notifications");

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const isPdf = path.extname(file.originalname).toLowerCase() === ".pdf";
  const isMimePdf = file.mimetype === "application/pdf";

  if (isPdf && isMimePdf) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"));
  }
};

const uploadNotice = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Allow 10MB for notices
});

module.exports = uploadNotice;
