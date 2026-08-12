/**===============================================================
 * WAS USED INITIALLY (not used now) CLOUDINARY IS BEING USED NOW
 =================================================================*/
const multer = require("multer");

const storage = multer.memoryStorage();

const uploadPdf = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed."));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

module.exports = uploadPdf;
