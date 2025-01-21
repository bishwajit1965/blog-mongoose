const Role = require("../models/Role");

const createRole = async (req, res) => {
  try {
    const { name, description, permissions = ["read"] } = req.body;
    const role = new Role({ name, description, permissions });
    await role.save();
    res.status(201).json({ message: "Role created successfully", role });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error in creating t=role", error: error.message });
  }
};

const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id);

    if (!role) {
      return res.status(404).json({ message: "Role not found." });
    }

    res.status(200).json(role);
  } catch (error) {
    console.error("Error fetching role:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status.json({
      message: "Error in fetching roles",
      error: error.message,
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name)
      return res
        .status(400)
        .json({ status: "error", message: "Role name is required." });
    if (!description)
      return res
        .status(400)
        .json({ status: "error", message: "Description is required." });

    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!updatedRole) {
      return res
        .status(404)
        .json({ status: "error", message: "Role not found." });
    }
    res.status(200).json(updatedRole);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error in updating role.", error: error.message });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByIdAndDelete(id);
    if (!role) return res.json(400).json({ message: "Role not found" });
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in deleting role", error: error.message });
  }
};

module.exports = {
  createRole,
  getRoleById,
  getAllRoles,
  updateRole,
  deleteRole,
};
