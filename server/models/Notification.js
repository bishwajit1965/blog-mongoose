const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  heading: { type: String },
  subject: { type: String },
  author: { type: String },
  content: { type: String, required: true },
  pdfUrl: { type: String },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["draft", "published", "archived", "deleted"],
    default: "draft",
  },
  isActive: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  noticeDate: { type: Date, default: Date.now() }, //Officially published date of the notice
  publishedAt: { type: Date, default: Date.now() },
  archivedAt: { type: Date, default: Date.now() },
  deletedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Notification", notificationSchema);
