const AuditLog = require("../models/AuditLog");
const FlaggedPost = require("../models/FlaggedPost");

const populateFields = (query) => {
  return query
    .populate("postId", "flaggedTitle flaggedSlug")
    .populate("moderatorId", "name email role");
};

const getAllAuditLogs = async (req, res) => {
  try {
    const logs = await populateFields(AuditLog.find({})).sort({
      timestamp: -1,
    }); // latest first
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching audit logs", error });
  }
};

const getAuditLogsBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const logs = await populateFields(AuditLog.find({ postSlug: slug })).sort({
      timestamp: -1,
    });
    res.status(200).json(logs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching logs for this post", error });
  }
};

const getAuditLogsByPostId = async (req, res) => {
  const { postId } = req.params;
  try {
    const logs = await populateFields(AuditLog.find({ postId })).sort({
      timestamp: -1,
    });
    res.status(200).json(logs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching logs for this post", error });
  }
};

const getAuditLogsByModeratorId = async (req, res) => {
  const { moderatorId } = req.params;
  try {
    const logs = await populateFields(AuditLog.find({ moderatorId })).sort({
      timestamp: -1,
    });
    res.status(200).json(logs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching logs for moderator", error });
  }
};

// ✅ Helper function to be used internally
const createAuditLog = async ({
  action,
  postId,
  moderatorId,
  comment,
  statusChange,
}) => {
  try {
    // Fetch flaggedTitle and flaggedSlug from the post
    const flaggedPost = await FlaggedPost.findById(postId).lean();
    if (!flaggedPost) {
      console.error("Flagged post not found for audit log.");
      return;
    }
    // Set default comments based on action
    let finalComment = comment;
    if (!finalComment) {
      if (action === "review-approved") {
        finalComment = "Reviewed and approved";
      } else if (action === "review-rejected") {
        finalComment = "Rejected due to policy violation";
      }
    }
    const log = new AuditLog({
      action,
      postId,
      flaggedTitle: flaggedPost.flaggedTitle,
      flaggedSlug: flaggedPost.flaggedSlug,
      moderatorId,
      comment: finalComment,
      statusChange,
      timestamp: new Date(),
    });
    await log.save();
    console.log("Audit log saved.");
  } catch (err) {
    console.error("Audit log failed:", err);
  }
};

const createAuditLogEntry = async (req, res) => {
  try {
    const {
      action,
      postId,
      flaggedTitle,
      flaggedSlug,
      moderatorId,
      comment,
      statusChange,
    } = req.body;
    const newLog = new AuditLog({
      action,
      postId,
      flaggedTitle,
      flaggedSlug,
      moderatorId,
      comment,
      statusChange,
      timestamp: new Date(),
    });

    await newLog.save();

    res.status(201).json({ message: "Audit log created successfully", newLog });
  } catch (error) {
    res.status(500).json({ message: "Error creating audit log", error });
  }
};

module.exports = {
  getAllAuditLogs,
  getAuditLogsBySlug,
  getAuditLogsByPostId,
  getAuditLogsByModeratorId,
  createAuditLog,
  createAuditLogEntry,
};
