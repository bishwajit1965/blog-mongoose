import AdminLoader from "../../adminComponent/adminLoader/AdminLoader";
import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import CTAButton from "../../../components/buttons/CTAButton";
import { FaTimesCircle } from "react-icons/fa";
import PermissionForm from "./PermissionForm";
import PermissionsTable from "./PermissionsTable";
import useAdminPermission from "../../adminHooks/useAdminPermission";
import { useState } from "react";

const ManagePermissions = () => {
  const { permissions, fetchPermissions, loading } = useAdminPermission();
  const [editingPermission, setEditingPermission] = useState(null);

  const handleEdit = (permission) => {
    setEditingPermission(permission);
  };

  const handleCancelEdit = () => {
    setEditingPermission(null);
  };

  return (
    <div className="">
      <AdminSubTitle
        dataLength={permissions.length}
        subTitle="Manage"
        decoratedText="Permissions"
      />
      <div className="p-2">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 grid-cols-1 md:grid-cols-2 gap-4">
            <div className="lg:col-span-6 col-span-12 lg:border-r dark:border-gray-700 lg:pr-6">
              <h2 className="text-xl font-semibold mb-2">
                {editingPermission ? "Update Permission" : "Add Permission"}
              </h2>
              <PermissionForm
                onSuccess={() => {
                  fetchPermissions(); //Not needed as dynamic update works
                  handleCancelEdit();
                }}
                existingPermission={editingPermission}
              />

              {editingPermission && (
                <>
                  <CTAButton
                    onClick={handleCancelEdit}
                    label="Cancel Edit"
                    className="btn btn-sm mt-2"
                    variant="warning"
                    icon={<FaTimesCircle />}
                  />
                </>
              )}
            </div>
            <div className="lg:col-span-6 col-span-12">
              <h2 className="text-xl font-semibold mb-2">
                Existing Permissions
              </h2>
              {loading ? (
                <AdminLoader />
              ) : (
                <PermissionsTable
                  permissions={permissions}
                  onEdit={handleEdit}
                  onDelete={fetchPermissions} // Handles deletion and reload
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePermissions;