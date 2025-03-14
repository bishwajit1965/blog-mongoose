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
  "update-post",
  "delete-post",
  "super_admin",
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
 * Validates user roles and permissions.
 * @param {Object} user - User object containing roles and permissions.
 * @throws Will throw an error if roles or permissions are invalid.
 */
const validateUserInput = (user) => {
  if (user.roles) validateRoles(user.roles);
  if (user.permissions) validatePermissions(user.permissions);
};

module.exports = { validateUserInput, validateRoles, validatePermissions };
