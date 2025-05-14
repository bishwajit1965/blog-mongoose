const Notification = require("../models/Notification");
const fs = require("fs");
const path = require("path");

const createNotification = async (req, res) => {
  try {
    const { title, heading, subject, author, content } = req.body;
    const createdBy = req.user.id;

    let pdfUrl = null;
    if (req.file) {
      // Assuming your static file server serves from /uploads
      pdfUrl = `/uploads/notifications/${req.file.filename}`;
    }
    const newNotification = new Notification({
      title,
      heading,
      subject,
      author,
      content,
      pdfUrl,
      createdBy,
    });

    await newNotification.save();
    res.status(201).json({
      success: true,
      message: "Notification is created successfully.",
      notification: newNotification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in creating notification.",
      error,
    });
  }
};

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in fetching notifications.",
      error,
    });
  }
};

const getActiveNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ isActive: true }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in fetching notifications.",
      error,
    });
  }
};

const toggleNotificationActiveStatus = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification)
      return res
        .status(404)
        .json({ success: false, message: "Notice not found." });
    notification.isActive = !notification.isActive;
    notification.status =
      notification.isActive === true
        ? (notification.status = "published")
        : (notification.status = "draft");
    await notification.save();
    res.json({
      success: true,
      message: "Notice status is updated!",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in notice status update.",
      error,
    });
  }
};

// PATCH /api/notifications/:id
const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, heading, subject, author, content } = req.body;
    console.log("Requested ID to update:", req.params.id);

    const existingNotification = await Notification.findById(id);
    if (!existingNotification)
      return res.status(404).json({ message: "Notification not found." });
    console.log("Existing notification:", existingNotification);

    // Handle PDF replacement
    let pdfUrl = existingNotification.pdfUrl;

    if (req.file) {
      // Delete the old file if exists
      if (pdfUrl) {
        const oldPath = path.join(
          __dirname,
          "..",
          "uploads",
          "notifications",
          path.basename(pdfUrl)
        );
        if (fs.existsSync(oldPath)) {
          try {
            fs.unlinkSync(oldPath);
          } catch (error) {
            console.warn("Failed to delete old PDF:", error);
          }
        }
      }
      pdfUrl = `/uploads/notifications/${req.file.filename}`;
    }

    const updated = await Notification.findByIdAndUpdate(
      id,
      {
        title: title || existingNotification.title,
        heading: heading || existingNotification.heading,
        subject: subject || existingNotification.subject,
        author: author || existingNotification.author,
        content: content || existingNotification.content,
        pdfUrl,
      },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Notification is not updated." });
    }

    res.json({ success: true, notification: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

const publishNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await Notification.findById(id);
    if (!notice) return res.status(404).json({ message: "Notice not found." });
    notice.status = "published";
    notice.isActive = true;
    notice.publishedAt = new Date();
    const updatedNotice = await notice.save();
    res.status(201).json({
      success: true,
      message: "Notice updated successfully.",
      updatedNotice,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error in publishing notice." });
  }
};

const archiveNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await Notification.findById(id);
    if (!notice) return res.status(404).json({ message: "Notice not found." });
    notice.status = "archived";
    notice.isActive = false;
    notice.archivedAt = new Date();
    const archivedNotice = await notice.save();
    res.status(201).json({
      success: true,
      message: "Notice archived successfully.",
      archivedNotice,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: " Internal server error in archiving notice." });
  }
};

const softDeleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await Notification.findById(id);
    if (!notice)
      return res
        .status(404)
        .json({ success: false, message: "Notice not found." });
    notice.status = "deleted";
    notice.isActive = false;
    notice.deletedAt = new Date();
    const softDeletedNotice = await notice.save();
    res.status(201).json({
      success: true,
      message: "Notice soft deleted successfully. ",
      softDeletedNotice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in soft deleting notice",
    });
  }
};

const permanentDeleteNoticeById = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);
    res.status(201).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in deleting notice", error: error.message });
  }
};

module.exports = {
  createNotification,
  getAllNotifications,
  getActiveNotifications,
  toggleNotificationActiveStatus,
  updateNotification,
  publishNotice,
  archiveNotice,
  softDeleteNotice,
  permanentDeleteNoticeById,
};
