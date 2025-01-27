import { useEffect, useState } from "react";

import CTAButton from "../../../components/buttons/CTAButton";
import { FaCompass } from "react-icons/fa";
import api from "../../adminServices/api";

const RolesAndPermissionsForm = ({ userId, authToken }) => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [message, setMessage] = useState("");
  console.log("Roles", roles);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesRes = await api.get("/roles");
        const permissionsRes = await api.get("/permissions");

        setRoles(rolesRes.data);
        setPermissions(permissionsRes.data);
      } catch (error) {
        console.error("Error fetching roles and permissions:", error.message);
      }
    };

    fetchData();
  }, [authToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch(
        `/users/${userId}/assign`,
        { roles: selectedRoles, permissions: selectedPermissions },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setMessage(res.data.message);
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
    <>
      <div className=" max-w-lg mx-auto">
        <h1 className="text-xl font-semibold mb-4">
          Assign Roles & Permissions
        </h1>
        {message && <p className="text-green-600">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h2 className="font-bold">Roles</h2>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((role) => (
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
          <div className="mb-4">
            <h2 className=" font-bold">Permissions</h2>
            <div className="grid grid-cols-2 gap-2">
              {permissions.map((perm) => (
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
          </div>
          <CTAButton
            label="Assign Role & Permission"
            className="btn btn-sm"
            icon={<FaCompass />}
          />
        </form>
      </div>
    </>
  );
};

export default RolesAndPermissionsForm;
