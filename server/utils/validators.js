// utils/validators.js

const validRoles = ["admin", "editor", "viewer", "writer", "user"];
const validPermissions = [
  "create",
  "read",
  "update",
  "delete",
  "super_admin",
  "member",
];

/**
 * Validates user roles and permissions.
 * @param {Object} user - User object containing roles and permissions.
 * @throws Will throw an error if roles or permissions are invalid.
 */
const validateUserInput = (user) => {
  if (user.roles && user.roles.some((role) => !validRoles.includes(role))) {
    throw new Error(`Invalid role provided: ${user.roles}`);
  }
  if (
    user.permissions &&
    user.permissions.some(
      (permission) => !validPermissions.includes(permission)
    )
  ) {
    throw new Error(`Invalid permission provided: ${user.permissions}`);
  }
};

module.exports = { validateUserInput };
