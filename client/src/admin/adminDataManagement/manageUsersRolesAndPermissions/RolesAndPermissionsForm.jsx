import { useEffect, useState } from "react";

import CTAButton from "../../../components/buttons/CTAButton";
import { FaCompass } from "react-icons/fa";
import api from "../../adminServices/api";

const RolesAndPermissionsForm = ({ user, roles, permissions, onSuccess }) => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]); // Editable
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [computedPermissions, setComputedPermissions] = useState([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Object Array mismatch solution for checkboxes to be selected with default values
  const normalizeIds = (arr) =>
    arr.map((item) => (typeof item === "object" ? item._id : item));

  useEffect(() => {
    if (user) {
      // Normalize direct assignments
      const directRoles = normalizeIds(user.roles) || [];
      const directPermissions = normalizeIds(user.permissions) || [];
      // If the role objects include a permissions array, compute inherited permissions:
      const inheritedPermissions =
        user.roles?.flatMap((role) => normalizeIds(role.permissions)) || [];
      // Merge both arrays and remove duplicates
      const allPermissions = [
        ...new Set([...directPermissions, ...inheritedPermissions]),
      ];
      setSelectedRoles(directRoles || []);
      setUserPermissions(directPermissions || []); // Editable user-specific permissions
      setSelectedPermissions(allPermissions || []);
      setComputedPermissions(inheritedPermissions || []);
      setEmail(user.email || ""); // Set the email field when a user is selected

      // setSelectedRoles(normalizeIds(user.roles) || []);
      // setSelectedPermissions(normalizeIds(user.permissions) || []);
      // setEmail(user.email || ""); // Set the email field when a user is selected
    } else {
      setSelectedRoles([]); // Reset when no user is selected
      setSelectedPermissions([]);
      setComputedPermissions([]);
      setUserPermissions([]);
      setEmail("");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch(`/users/${user._id}/assign`, {
        roles: selectedRoles,
        permissions: selectedPermissions,
      });
      setMessage(res.data.message);
      onSuccess();
    } catch (error) {
      console.error("Error assigning roles and permissions:", error.message);
      setMessage("Error assigning roles and permissions.");
    }
  };

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      {message && <p className="text-green-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          {email && (
            <>
              <div className="mb-4">
                <label htmlFor="email" className="block font-bold">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full input-xs input-bordered text-gray-950 dark:text-base-200 dark:bg-gray-700"
                  disabled
                />
              </div>
            </>
          )}

          <h2 className="font-bold">Roles</h2>
          <div className="grid grid-cols-2 gap-2">
            {roles?.map((role) => (
              <label key={role._id} className="flex items-center">
                <input
                  type="checkbox"
                  value={role._id}
                  onChange={() =>
                    toggleSelection(role._id, selectedRoles, setSelectedRoles)
                  }
                  checked={selectedRoles.includes(role._id)}
                  className="mr-2 input-xs"
                />
                {role.name}
              </label>
            ))}
          </div>
        </div>
        {/* Read-Only Computed Permissions */}
        {/* <div className="mb-4">
          <h2 className="font-bold">Permissions</h2>
          <div className="grid grid-cols-2 gap-2">
            {computedPermissions?.map((perm) => (
              <label key={perm._id} className="flex items-center">
                <input
                  type="checkbox"
                  value={perm._id}
                  onChange={() =>
                    toggleSelection(
                      perm._id,
                      selectedPermissions,
                      setSelectedPermissions
                    )
                  }
                  checked={selectedPermissions.includes(perm._id)}
                  className="mr-2 input-xs"
                />
                {perm.name}
              </label>
            ))}
          </div>
        </div> */}
        <div className="mb-4">
          <h2 className="font-bold">Computed Permissions (Read-Only)</h2>
          <div className="grid grid-cols-2 gap-2">
            {computedPermissions?.map((perm) => (
              <label key={perm} className="flex items-center opacity-50">
                <input type="checkbox" checked readOnly className="mr-2" />
                {permissions.find((p) => p._id === perm)?.name || "Unknown"}
              </label>
            ))}
          </div>
        </div>

        {/* Editable User-Specific Permissions */}
        <div className="mb-4">
          <h2 className="font-bold">User-Specific Permissions</h2>
          <div className="grid grid-cols-2 gap-2">
            {permissions?.map((perm) => (
              <label key={perm._id} className="flex items-center">
                <input
                  type="checkbox"
                  value={perm._id}
                  onChange={() =>
                    toggleSelection(
                      perm._id,
                      userPermissions,
                      setUserPermissions
                    )
                  }
                  checked={userPermissions.includes(perm._id)}
                  className="mr-2 input-xs"
                />
                {perm.name}
              </label>
            ))}
          </div>
        </div>

        <CTAButton
          label="Assign Role & Permission"
          className="btn btn-sm"
          icon={<FaCompass />}
        />
      </form>
    </div>
  );
};

export default RolesAndPermissionsForm;
