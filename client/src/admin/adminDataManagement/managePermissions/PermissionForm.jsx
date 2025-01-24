import { FaEdit, FaPlusCircle } from "react-icons/fa";
import {
  createPermission,
  updatePermission,
} from "../../adminServices/permissionService";
import {
  notifyError,
  notifySuccess,
} from "../../adminComponent/adminToastNotification/AdminToastNotification";
import { useEffect, useState } from "react";

import CTAButton from "../../../components/buttons/CTAButton";
import useAdminPermission from "../../adminHooks/useAdminPermission";

const PermissionForm = ({ onSuccess, existingPermission = null }) => {
  const [permissionName, setPermissionName] = useState(
    existingPermission?.name || ""
  );
  const [permissionDescription, setPermissionDescription] = useState(
    existingPermission?.description || ""
  );
  const [loading, setLoading] = useState(false);

  const { addPermissionToState, updatePermissionInState } =
    useAdminPermission();

  useEffect(() => {
    if (existingPermission) {
      setPermissionName(existingPermission.name);
      setPermissionDescription(existingPermission.description);
    } else {
      setPermissionName("");
      setPermissionDescription("");
    }
  }, [existingPermission]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!permissionName.trim()) {
      notifyError("Permission name is required.");
      return;
    }
    if (!permissionDescription.trim()) {
      notifyError("Permission description is required.");
      return;
    }

    try {
      setLoading(true);
      const permissionData = {
        name: permissionName,
        description: permissionDescription,
      };

      if (existingPermission) {
        const updatedPermission = await updatePermission(
          existingPermission._id,
          permissionData
        );
        updatePermissionInState(updatedPermission);
        notifySuccess("Permission updated successfully!");
      } else {
        const newPermission = await createPermission(permissionData);
        addPermissionToState(newPermission);
        notifySuccess("Permission created successfully!");
      }
      onSuccess();
      setPermissionName("");
      setPermissionDescription("");
    } catch (error) {
      console.error("Error submitting permission:", error);
      notifyError("Error submitting permission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2">Permission Name:</label>
          <input
            type="text"
            value={permissionName}
            onChange={(e) => setPermissionName(e.target.value)}
            className="input input-bordered input-sm w-full dark:bg-gray-700"
            // required
          />
          <label className="block mb-2">Permission Description:</label>
          <input
            type="text"
            value={permissionDescription}
            onChange={(e) => setPermissionDescription(e.target.value)}
            className="input input-bordered input-sm w-full dark:bg-gray-700"
            // required
          />
        </div>

        <CTAButton
          label={
            loading
              ? "Saving..."
              : existingPermission
              ? "Update Permission"
              : "Create Permission"
          }
          disabled={loading}
          className="btn btn-sm mt-4"
          icon={existingPermission ? <FaEdit /> : <FaPlusCircle />}
          variant={existingPermission ? "success" : "primary"}
        />
      </form>
    </>
  );
};

export default PermissionForm;
