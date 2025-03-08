import { Suspense, lazy } from "react";

import { NavLink } from "react-router-dom";

const FaArrowAltCircleRight = lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaArrowAltCircleRight,
  }))
);

const SuperAdminFeatures = () => {
  const superAdminRoutesFeatures = [
    { id: 1, route: "super-admin-dashboard", name: "Sup-Adm Dashboard" },
    { id: 2, route: "manage-blogs", name: "Manage Blog Posts" },
    { id: 3, route: "manage-categories", name: "Manage Categories" },
    { id: 4, route: "manage-tags", name: "Manage Tags" },
    { id: 5, route: "manage-roles", name: "Manage Roles" },
    { id: 6, route: "manage-permissions", name: "Manage Permission" },
    { id: 7, route: "assign-roles-permissions", name: "Manage User Roles" },
    { id: 8, route: "manage-profile", name: "Manage User Profile" },
  ];

  return (
    <div className="dark:bg-gray-800 bg-base-200 border-b border-gray-200 shadow-sm rounded-b-sm dark:border-gray-700">
      <div className="lg:space-y-2 p-2">
        {superAdminRoutesFeatures.map((path) => (
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
            {path.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SuperAdminFeatures;

// import { FaArrowAltCircleRight } from "react-icons/fa";
// import { NavLink } from "react-router-dom";

// const SuperAdminFeatures = () => {
//   const superAdminRoutesFeatures = [
//     { id: 1, route: "super-admin-dashboard", name: "Sup-Admin Dashboard" },
//     { id: 2, route: "manage-blogs", name: "Manage Blog Posts" },
//     { id: 3, route: "manage-categories", name: "Manage Categories" },
//     { id: 4, route: "manage-tags", name: "Manage Tags" },
//     { id: 5, route: "manage-roles", name: "Manage Roles" },
//     { id: 6, route: "manage-permissions", name: "Manage Permission" },
//     {
//       id: 7,
//       route: "assign-roles-permissions",
//       name: "Manage User Roles",
//     },
//     {
//       id: 8,
//       route: "manage-profile",
//       name: "Manage User Profile",
//     },
//   ];
//   return (
//     <div
//       className="dark:bg-gray-800 bg-base-200 border-b border-gray-200 shadow-sm rounded-b-sm dark:border-gray-700
//        "
//     >
//       <div className="lg:space-y-2 p-2">
//         {superAdminRoutesFeatures.map((path) => (
//           <NavLink
//             key={path.id}
//             to={path.route}
//             className="m-0 flex items-center hover:link-neutral hover:font-bold dark:hover:link-success hover:animate-pulse"
//           >
//             <FaArrowAltCircleRight className="mr-2 hover:animate-spin" />{" "}
//             {path.name}
//           </NavLink>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SuperAdminFeatures;
