import { useEffect, useState } from "react";

import AdminLoader from "../../adminComponent/adminLoader/AdminLoader";
import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import CTAButton from "../../../components/buttons/CTAButton";
import { FaTimesCircle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import RolesAndPermissionsForm from "./RolesAndPermissionsForm";
import UsersTable from "./UsersTable";
import useAdminPermission from "../../adminHooks/useAdminPermission";
import useAdminRole from "../../adminHooks/useAdminRole";
import useAdminUser from "../../adminHooks/useAdminUser";

const ManageUsersRolesAndPermissions = () => {
  const [loading, setLoading] = useState(false);
  const { permissions, fetchPermissions } = useAdminPermission();
  const { roles } = useAdminRole();
  const { users } = useAdminUser();
  const [editingPermission, setEditingPermission] = useState(null);

  const [permissionData, setPermissionData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [userData, setUserData] = useState([]);

  console.log("Permissions", permissionData);
  console.log("Roles", roleData);
  console.log("Users", userData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setPermissionData(permissions);
        setRoleData(roles);
        setUserData(users);
      } catch (error) {
        console.error("Error in fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [permissions, roles, users]);

  const handleEdit = (permission) => {
    setEditingPermission(permission);
  };

  const handleCancelEdit = () => {
    setEditingPermission(null);
  };

  return (
    <div>
      <Helmet>
        <title>Blog || Manage Users Roles</title>
      </Helmet>
      <AdminSubTitle
        dataLength={users?.length ? users.length : 0}
        subTitle="Manage"
        decoratedText="Roles & Permissions"
      />
      <div className="p-2">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 grid-cols-1 md:grid-cols-2 gap-4">
            <div className="lg:col-span-6 col-span-12 lg:border-r dark:border-gray-700 lg:pr-3">
              <h2 className="text-xl font-semibold mb-2">
                {editingPermission ? "Update Permission" : "Add Permission"}
              </h2>
              <RolesAndPermissionsForm
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
                <UsersTable
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

export default ManageUsersRolesAndPermissions;
