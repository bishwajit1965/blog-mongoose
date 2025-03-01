import {
  notifyError,
  notifySuccess,
} from "../../adminComponent/adminToastNotification/AdminToastNotification";
import { useEffect, useState } from "react";

import API_PATHS from "../../adminServices/apiPaths";
import AdminLoader from "../../adminComponent/adminLoader/AdminLoader";
import CTAButton from "../../../components/buttons/CTAButton";
import { FaCompass } from "react-icons/fa";
import api from "../../adminServices/api";
import { normalizeIds } from "../../../../../server/utils/utils";

const RolesAndPermissionsForm = ({ user, roles, permissions, onSuccess }) => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]); // Editable
  const [computedPermissions, setComputedPermissions] = useState([]);
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const directRoles = normalizeIds(user.roles || []) || [];
      const directPermissions = normalizeIds(user.permissions || []) || [];

      const inheritedPermissions =
        user.roles?.flatMap((role) => normalizeIds(role.permissions)) || [];
      setSelectedRoles(directRoles || []);
      setUserPermissions(directPermissions || []);
      setComputedPermissions(inheritedPermissions || []);
      setEmail(user.email || "");
    } else {
      setSelectedRoles([]);
      setComputedPermissions([]);
      setUserPermissions([]);
      setEmail("");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.patch(
        `${API_PATHS.USERS}/${user._id}/assign`,
        {
          roles: selectedRoles,
          permissions: userPermissions,
        },
        { withCredentials: true }
      );
      onSuccess();
      setSuccessMessage(res.data.message);
      notifySuccess(res.data.message);
    } catch (error) {
      notifyError(error.message);
      console.error("Error assigning roles and permissions:", error.message);
      setErrorMessage("Error assigning roles and permissions.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  // Vanish the generic success message
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Vanish the generic error message
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <>
      {loading && <AdminLoader />}

      <div className="max-w-lg mx-auto">
        {successMessage && (
          <p className="text-base-100 bg-green-600 rounded-md p-2">
            {successMessage}
          </p>
        )}

        {errorMessage && (
          <p className="text-base-100 bg-red-600 rounded-md p-2">
            {errorMessage}
          </p>
        )}
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

            <h2 className="font-bold">User Specific Roles:</h2>
            <div className="grid grid-cols-3 gap-2">
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
          <div className="mb-4">
            <h2 className="font-bold">Computed Permissions (Read-Only):</h2>
            <div className="grid grid-cols-3 gap-2">
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
            <h2 className="font-bold">User-Specific Permissions:</h2>
            <div className="grid grid-cols-3 gap-2">
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
          {user && (
            <CTAButton
              label="Assign Role & Permission"
              className="btn btn-sm"
              icon={<FaCompass />}
            />
          )}
        </form>
      </div>
    </>
  );
};

export default RolesAndPermissionsForm;
