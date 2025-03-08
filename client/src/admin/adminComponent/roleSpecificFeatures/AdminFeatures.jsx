import { Suspense, lazy } from "react";

import { NavLink } from "react-router-dom";

const FaArrowAltCircleRight = lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaArrowAltCircleRight,
  }))
);

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
        {adminRoutesFeatures.map((path) => (
          <NavLink
            key={path.id}
            to={path.route}
            className={({ isActive }) =>
              `m-0 flex items-center px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-bold"
                  : "hover:bg-gray-100 dark:hover:bg-gray-600 hover:font-bold"
              }`
            }
          >
            <Suspense fallback={<span>🔄</span>}>
              <FaArrowAltCircleRight className="mr-2" />
            </Suspense>
            {path.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminFeatures;
