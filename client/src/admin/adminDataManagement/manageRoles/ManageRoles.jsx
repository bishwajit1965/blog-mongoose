import AdminLoader from "../../adminComponent/adminLoader/AdminLoader";
import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import CTAButton from "../../../components/buttons/CTAButton";
import { FaTimesCircle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import RoleForm from "./RoleForm";
import RolesTable from "./RolesTable";
import useAdminRole from "../../adminHooks/useAdminRole";
import { useEffect, useState } from "react";
/**=============================================
 * For the toggling of React Multi Select fields
 * @param {*} isDark
 * @returns
 *=============================================*/
const customStyles = (isDark) => ({
  control: (provided) => ({
    ...provided,
    backgroundColor: isDark ? "#1e293b" : "#ffffff",
    borderColor: isDark ? "#334155" : "#d1d5db",
    color: isDark ? "#e5e7eb" : "#111827",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: isDark ? "#1e293b" : "#ffffff",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? isDark
        ? "#334155"
        : "#e5e7eb"
      : isDark
        ? "#1e293b"
        : "#ffffff",
    color: isDark ? "#e5e7eb" : "#111827",
    cursor: "pointer",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: isDark ? "#334155" : "#e5e7eb",
  }),

  multiValueLabel: (provided) => ({
    ...provided,
    color: isDark ? "#e5e7eb" : "#111827",
  }),

  multiValueRemove: (provided) => ({
    ...provided,
    color: isDark ? "#e5e7eb" : "#111827",
    ":hover": {
      backgroundColor: "#ef4444",
      color: "white",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: isDark ? "#e5e7eb" : "#111827",
  }),

  placeholder: (provided) => ({
    ...provided,
    color: isDark ? "#94a3b8" : "#6b7280",
  }),

  singleValue: (provided) => ({
    ...provided,
    color: isDark ? "#e5e7eb" : "#111827",
  }),
});

const ManageRoles = () => {
  const { roles, fetchRoles, loading } = useAdminRole();
  const [editingRole, setEditingRole] = useState(null);
  const [isDark, setIsDark] = useState(
    document.body.classList.contains("dark"),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains("dark"));
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

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
          <div className="grid lg:grid-cols-12 grid-cols-1 md:grid-cols-2 gap-2">
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
                isDark={isDark}
                customStyles={customStyles}
              />

              {editingRole && (
                <div className="lg:mt-[-40px] lg:pl-[140px]">
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
