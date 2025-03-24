const mongoose = require("mongoose");

const validRoles = [
  "admin",
  "editor",
  "viewer",
  "writer",
  "user",
  "super-admin",
];

const validPermissions = [
  "create-post",
  "read-post",
  "edit-post",
  "delete-post",
  "super-admin",
  "member",
];

/**
 * Validates user roles.
 * @param {Array} roles - Array of roles to validate.
 * @throws Will throw an error if any role is invalid.
 */
const validateRoles = (roles) => {
  if (!Array.isArray(roles)) {
    throw new Error("Roles must be an array.");
  }

  const invalidRoles = roles.filter((role) => !validRoles.includes(role));
  if (invalidRoles.length > 0) {
    throw new Error(`Invalid roles provided: ${invalidRoles.join(", ")}`);
  }
};

/**
 * Validates user permissions.
 * @param {Array} permissions - Array of permissions to validate.
 * @throws Will throw an error if any permission is invalid.
 */
const validatePermissions = (permissions) => {
  if (!Array.isArray(permissions)) {
    throw new Error("Permissions must be an array.");
  }

  const invalidPermissions = permissions.filter(
    (permission) => !validPermissions.includes(permission)
  );
  if (invalidPermissions.length > 0) {
    throw new Error(
      `Invalid permissions provided: ${invalidPermissions.join(", ")}`
    );
  }
};

/**
 * Validates blog post title.
 * @param {String} title - Title of the blog post.
 * @throws Will throw an error if title is not valid.
 */
const validateBlogTitle = (title) => {
  if (title.length < 50 || title.length > 60) {
    throw new Error("Title should be between 50 and 60 characters.");
  }

  // You could add more title validations like checking for unique titles here.
};

/**
 * Validates blog post content.
 * @param {String} content - Content of the blog post.
 * @throws Will throw an error if content is not valid.
 */
const validateBlogContent = (content) => {
  if (!content || content.trim().length < 200) {
    throw new Error("Content should be at least 200 characters long.");
  }
};

/**
 * Validates blog post categories.
 * @param {Array} categories - Categories for the blog post.
 * @throws Will throw an error if categories are not valid.
 */
const validateBlogCategories = (categories) => {
  if (!Array.isArray(categories)) {
    throw new Error("Categories must be an array.");
  }

  // Example: You could define valid categories here and check if they exist.
  const validCategories = ["Web Development", "SEO", "JavaScript", "Node.js"];
  const invalidCategories = categories.filter(
    (category) => !validCategories.includes(category)
  );

  if (invalidCategories.length > 0) {
    throw new Error(`Invalid categories: ${invalidCategories.join(", ")}`);
  }
};

/**
 * Validates blog post tags.
 * @param {Array} tags - Tags for the blog post.
 * @throws Will throw an error if tags are not valid.
 */
const validateBlogTags = (tags) => {
  if (!Array.isArray(tags)) {
    throw new Error("Tags must be an array.");
  }

  // Example: Tags can be anything; you could restrict this later if needed.
  if (tags.length === 0) {
    throw new Error("At least one tag is required.");
  }
};

/**
 * Validates blog post input.
 * @param {Object} blog - Blog object containing title, content, categories, and tags.
 * @throws Will throw an error if any field is invalid.
 */
const validateBlogPostInput = (blog) => {
  if (blog.title) validateBlogTitle(blog.title);
  if (blog.content) validateBlogContent(blog.content);
  if (blog.categories) validateBlogCategories(blog.categories);
  if (blog.tags) validateBlogTags(blog.tags);
};

// User validation
const validateUserInput = (user) => {
  if (user.roles) validateRoles(user.roles);
  if (user.permissions) validatePermissions(user.permissions);
};

module.exports = {
  validateUserInput,
  validateRoles,
  validatePermissions,
  validateBlogPostInput,
  validateBlogTitle,
  validateBlogContent,
  validateBlogCategories,
  validateBlogTags,
};
