const Tag = require("../models/Tag");

const createTag = async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json({ tag, message: "Tag created successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findById(id);
    res.status(200).json({ tag, message: "Tag found successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ tag, message: "Tag updated successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    await Tag.findByIdAndDelete(id);
    res.status(200).json({ message: "Tag deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createTag,
  getTagById,
  getAllTags,
  getAllTags,
  updateTag,
  deleteTag,
};
