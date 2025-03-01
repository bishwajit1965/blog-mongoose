import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { createRole, updateRole } from "../../adminServices/roleService";
import {
  notifyError,
  notifySuccess,
} from "../../adminComponent/adminToastNotification/AdminToastNotification";
import { useEffect, useState } from "react";

import CTAButton from "../../../components/buttons/CTAButton";
import Select from "react-select";
import useAdminPermission from "../../adminHooks/useAdminPermission";
import useAdminRole from "../../adminHooks/useAdminRole";

const RoleForm = ({ onSuccess, existingRole = null }) => {
  const [roleName, setRoleName] = useState(existingRole?.name || "");
  const [roleDescription, setRoleDescription] = useState(
    existingRole?.description || ""
  );
  const [loading, setLoading] = useState(false);
  const { addRoleToState, updateRoleInState } = useAdminRole();
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const { permissions } = useAdminPermission();

  const options = permissions.map((permission) => ({
    value: permission._id,
    label: permission.name,
  }));

  useEffect(() => {
    if (existingRole) {
      setRoleName(existingRole.name);
      setRoleDescription(existingRole.description);

      const existingPermissions = existingRole.permissions
        .map((permId) => {
          const matchingPermission = permissions.find(
            (perm) => perm._id === permId
          );
          return matchingPermission
            ? {
                value: matchingPermission._id,
                label: matchingPermission.name,
              }
            : null;
        })
        .filter(Boolean);
      setSelectedPermissions(existingPermissions);
    } else {
      setRoleName("");
      setRoleDescription("");
      setSelectedPermissions([]);
    }
  }, [existingRole, permissions]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const permissionIds = selectedPermissions.map(
      (permission) => permission.value
    );

    if (!roleName.trim()) {
      notifyError("Role name is required.");
      return;
    }
    if (!roleDescription.trim()) {
      notifyError("Role description is required.");
      return;
    }

    try {
      setLoading(true);
      const roleData = {
        name: roleName,
        description: roleDescription,
        permissions: permissionIds,
      };

      if (existingRole) {
        const updatedRole = await updateRole(existingRole._id, roleData);
        updateRoleInState(updatedRole);
        notifySuccess("Role updated successfully!");
      } else {
        const newRole = await createRole(roleData);
        addRoleToState(newRole);
        notifySuccess("Role created successfully!");
      }
      onSuccess();
      setRoleName("");
      setRoleDescription("");
      setSelectedPermissions([]);
    } catch (error) {
      console.error("Error submitting role:", error);
      notifyError("Failed to assign role. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">Role Name:</label>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder="Enter Role Name"
            className="input input-bordered input-sm w-full dark:bg-gray-700 mb-2"
            // required
          />
          <label className="block mb-1">Role Description:</label>
          <input
            type="text"
            value={roleDescription}
            onChange={(e) => setRoleDescription(e.target.value)}
            placeholder="Enter Role Description"
            className="input input-bordered input-sm w-full dark:bg-gray-700 mb-2"
            // required
          />

          <label className="block mb-1">Permissions:</label>
          <Select
            isMulti
            options={options}
            value={selectedPermissions}
            onChange={(selectedOptions) =>
              setSelectedPermissions(selectedOptions)
            }
            placeholder="Select permissions..."
            className="dark:bg-gray-700 mb-2"
          />
        </div>

        <CTAButton
          label={
            loading ? "Saving..." : existingRole ? "Update Role" : "Create Role"
          }
          disabled={loading}
          className="btn btn-sm mt-4"
          icon={existingRole ? <FaEdit /> : <FaPlusCircle />}
          variant={existingRole ? "success" : "primary"}
        />
      </form>
    </div>
  );
};

export default RoleForm;
