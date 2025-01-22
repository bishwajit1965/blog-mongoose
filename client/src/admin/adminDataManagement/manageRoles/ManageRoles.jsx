import AdminLoader from "../../adminComponent/adminLoader/AdminLoader";
import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import CTAButton from "../../../components/buttons/CTAButton";
import { FaTimesCircle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import RoleForm from "./RoleForm";
import RolesTable from "./RolesTable";
import useAdminRole from "../../adminHooks/useAdminRole";
import { useState } from "react";

const ManageRoles = () => {
  const { roles, fetchRoles, loading } = useAdminRole();
  const [editingRole, setEditingRole] = useState(null);

  const handleEdit = (role) => {
    setEditingRole(role);
  };

  const handleCancelEdit = () => {
    setEditingRole(null);
  };

  return (
    <>
      <Helmet>
        <title>Blog || Manage Roles</title>
      </Helmet>
      <AdminSubTitle
        dataLength={roles.length}
        subTitle="Manage"
        decoratedText="Roles"
      />
      <div className="lg:p-2">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 grid-cols-1 md:grid-cols-2 gap-4">
            <div className="lg:col-span-6 col-span-12 lg:border-r dark:border-gray-700 lg:pr-3">
              <h2 className="text-xl font-semibold mb-2">
                {editingRole ? "Update Role" : "Add Role"}
              </h2>
              <RoleForm
                onSuccess={() => {
                  fetchRoles(); //Not needed as dynamic update works
                  handleCancelEdit();
                }}
                existingRole={editingRole}
              />

              {editingRole && (
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
              <h2 className="text-xl font-semibold mb-2">Existing Roles</h2>
              {loading ? (
                <AdminLoader />
              ) : (
                <RolesTable
                  roles={roles}
                  onEdit={handleEdit}
                  onDelete={fetchRoles} // Handles deletion and reload
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageRoles;
