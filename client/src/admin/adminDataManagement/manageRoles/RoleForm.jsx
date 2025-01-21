import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { createRole, updateRole } from "../../adminServices/roleService";
import { useEffect, useState } from "react";

import CTAButton from "../../../components/buttons/CTAButton";
import useAdminRole from "../../adminHooks/useAdminRole";

const RoleForm = ({ onSuccess, existingRole = null }) => {
  const [roleName, setRoleName] = useState(existingRole?.name || "");
  const [roleDescription, setRoleDescription] = useState(
    existingRole?.description || ""
  );
  const [loading, setLoading] = useState(false);
  const { addRoleToState, updateRoleInState } = useAdminRole();

  useEffect(() => {
    if (existingRole) {
      setRoleName(existingRole.name);
      setRoleDescription(existingRole.description);
    } else {
      setRoleName("");
      setRoleDescription("");
    }
  }, [existingRole]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roleName.trim()) {
      alert("Role name is required.");
      return;
    }

    try {
      setLoading(true);
      const roleData = { name: roleName, description: roleDescription };
      if (existingRole) {
        const updatedRole = await updateRole(existingRole._id, roleData);
        updateRoleInState(updatedRole);
        alert("Role updated successfully!");
      } else {
        const newRole = await createRole(roleData);
        addRoleToState(newRole);
        alert("Role created successfully!");
      }
      onSuccess();
      setRoleName("");
      setRoleDescription("");
    } catch (error) {
      console.error("Error submitting role:", error);
      alert("Failed to submit role.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2">Role Name:</label>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="input input-bordered input-sm w-full dark:bg-gray-700"
            required
          />
          <label className="block mb-2">Role Description:</label>
          <input
            type="text"
            value={roleDescription}
            onChange={(e) => setRoleDescription(e.target.value)}
            className="input input-bordered input-sm w-full dark:bg-gray-700"
            required
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
