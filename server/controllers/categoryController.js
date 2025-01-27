const Category = require("../models/Category");

const createCategory = async (req, res) => {
  try {
    const { name, slug, description, parent } = req.body;
    console.log("Request Body:", req.body);
    const category = new Category({ name, slug, description, parent });
    await category.save();
    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error in creating category", error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching categories",
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, parent } = req.body;

    if (!name)
      return res
        .status(400)
        .json({ status: "error", message: "Category name is required." });

    if (!slug)
      return res
        .status(400)
        .json({ status: "error", message: "Slug is required." });

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, slug, description, parent },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Category updated successfully", updatedCategory });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating category", error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting category", error: error.message });
  }
};

module.exports = {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
