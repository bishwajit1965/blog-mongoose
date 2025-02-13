import { FaArrowAltCircleRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SuperAdminFeatures = () => {
  const superAdminRoutesFeatures = [
    { id: 1, route: "super-admin-dashboard", name: "Sup-Admin Dashboard" },
    { id: 2, route: "manage-blogs", name: "Manage Blog Posts" },
    { id: 3, route: "manage-categories", name: "Manage Categories" },
    { id: 4, route: "manage-tags", name: "Manage Tags" },
    { id: 5, route: "manage-roles", name: "Manage Roles" },
    { id: 6, route: "manage-permissions", name: "Manage Permission" },
    {
      id: 7,
      route: "assign-roles-permissions",
      name: "Manage User Roles",
    },
  ];
  return (
    <div className="dark:bg-gray-800 bg-base-200 border-b border-gray-200 shadow-sm rounded-b-sm dark:border-gray-700">
      <div className="lg:space-y-2 p-2">
        {superAdminRoutesFeatures.map((path) => (
          <NavLink
            key={path.id}
            to={path.route}
            className="m-0 flex items-center hover:link-neutral hover:font-bold dark:hover:link-success hover:animate-pulse"
          >
            <FaArrowAltCircleRight className="mr-2 hover:animate-spin" />{" "}
            {path.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SuperAdminFeatures;
