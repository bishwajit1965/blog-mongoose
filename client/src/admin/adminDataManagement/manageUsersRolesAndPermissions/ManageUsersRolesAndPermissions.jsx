import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import CTAButton from "../../../components/buttons/CTAButton";
import { FaTimesCircle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import RolesAndPermissionsForm from "./RolesAndPermissionsForm";
import UsersTable from "./UsersTable";
import useAdminPermission from "../../adminHooks/useAdminPermission";
import useAdminRole from "../../adminHooks/useAdminRole";
import useAdminUser from "../../adminHooks/useAdminUser";
import { useState } from "react";

const ManageUsersRolesAndPermissions = () => {
  const { permissions, fetchPermissions } = useAdminPermission();
  const { roles } = useAdminRole();
  const { users } = useAdminUser();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleCancelEdit = () => {
    setSelectedUser(null);
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
                {selectedUser
                  ? "Update Roles Permission"
                  : "Add Roles Permissions"}
              </h2>
              <RolesAndPermissionsForm
                permissions={permissions}
                roles={roles}
                user={selectedUser}
                onSuccess={() => {
                  fetchPermissions(); //Not needed as dynamic update works
                  handleCancelEdit();
                }}
              />

              {selectedUser && (
                <div className="lg:mt-[-40px] lg:pl-[220px]">
                  <CTAButton
                    onClick={handleCancelEdit}
                    label="Cancel Edit"
                    className="btn btn-sm mt-2"
                    variant="warning"
                    icon={<FaTimesCircle />}
                  />
                </div>
              )}
            </div>
            <div className="lg:col-span-6 col-span-12">
              <h2 className="text-xl font-semibold mb-2">Existing Users</h2>
              <UsersTable users={users} onEdit={handleEdit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsersRolesAndPermissions;
