import { FaArrowAltCircleRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminFeatures = () => {
  const adminRoutesFeatures = [
    {
      id: 1,
      route: "admin-dashboard",
      label: "Dashboard Home",
    },
    {
      id: 2,
      route: "manage-blogs",
      label: "Manage Blog Posts",
    },
    {
      id: 3,
      route: "manage-categories",
      label: "Manage Categories",
    },
    {
      id: 4,
      route: "manage-tags",
      label: "Manage Tags",
    },
    {
      id: 5,
      route: "manage-roles",
      label: "Manage Roles",
    },
    {
      id: 6,
      route: "manage-permission",
      label: "Manage Permission",
    },
    {
      id: 7,
      route: "assign-roles-permissions",
      label: "Manage User Roles",
    },
  ];

  return (
    <div className="dark:bg-gray-800 bg-base-200 border-b border-gray-200 shadow-sm rounded-b-sm dark:border-gray-700">
      <div className="lg:space-y-2 p-2">
        {adminRoutesFeatures.map((route) => (
          <NavLink
            key={route.id}
            to={route.route}
            className="m-0 flex items-center hover:link-neutral hover:font-bold dark:hover:link-success hover:animate-pulse"
          >
            <FaArrowAltCircleRight className="mr-2 hover:animate-spin" />{" "}
            {route.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminFeatures;
