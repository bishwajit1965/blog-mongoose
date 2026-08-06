import { Suspense, lazy } from "react";
import { NavLink } from "react-router-dom";

const FaArrowAltCircleRight = lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaArrowAltCircleRight,
  })),
);

const routeGroups = [
  {
    title: "Dashboard",
    routes: [
      {
        id: 1,
        route: "super-admin-dashboard",
        name: "Super Admin Dashboard",
      },
    ],
  },
  {
    title: "User Management",
    routes: [
      {
        id: 2,
        route: "manage-users",
        name: "Manage Users",
      },
      {
        id: 3,
        route: "manage-profile",
        name: "Manage User Profile",
      },
      {
        id: 4,
        route: "manage-follow-unfollow",
        name: "Manage Followers",
      },
    ],
  },
  {
    title: "Roles & Permissions",
    routes: [
      {
        id: 5,
        route: "manage-roles",
        name: "Manage Roles",
      },
      {
        id: 6,
        route: "manage-permissions",
        name: "Manage Permissions",
      },
      {
        id: 7,
        route: "assign-roles-permissions",
        name: "Assign Roles & Permissions",
      },
    ],
  },
  {
    title: "Content",
    routes: [
      {
        id: 8,
        route: "manage-blogs",
        name: "Manage Blog Posts",
      },
      {
        id: 9,
        route: "coming-soon",
        name: "Coming Soon Posts",
      },
      {
        id: 10,
        route: "scheduled-posts",
        name: "Scheduled Posts",
      },
      {
        id: 11,
        route: "archived-blogs",
        name: "Archived Posts",
      },
      {
        id: 12,
        route: "flagged-blogs",
        name: "Flagged Posts",
      },
      {
        id: 13,
        route: "manage-categories",
        name: "Manage Categories",
      },
      {
        id: 14,
        route: "manage-tags",
        name: "Manage Tags",
      },
      {
        id: 15,
        route: "manage-comments",
        name: "Manage Comments",
      },
      {
        id: 16,
        route: "manage-pages",
        name: "Manage Pages",
      },
    ],
  },
  {
    title: "System",
    routes: [
      {
        id: 17,
        route: "manage-audit-logs",
        name: "Audit Logs",
      },
      {
        id: 18,
        route: "manage-notification",
        name: "Notifications",
      },
      {
        id: 19,
        route: "manage-messages",
        name: "Messages",
      },
      {
        id: 20,
        route: "system-settings",
        name: "System Settings",
      },
    ],
  },
];

const SuperAdminFeatures = () => {
  return (
    <aside className="bg-base-200 dark:bg-gray-800 rounded-b-sm border-gray-200 dark:border-gray-700">
      <div className="lg:h-[calc(100vh-145px)] lg:overflow-y-auto lg:fixed lg:top-[146px] lg:w-[260px] p-2 space-y-5">
        {routeGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {group.title}
            </h3>

            <div className="space-y-1">
              {group.routes.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.route}
                  className={({ isActive }) =>
                    `flex items-center px-1 py-1 rounded-sm transition-colors text-medium m-0 ${
                      isActive
                        ? "bg-gray-300 dark:bg-gray-700 text-sm font-semibold text-black dark:text-white m-0"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 m-0"
                    }`
                  }
                >
                  <Suspense fallback={<span>Ã¢â‚¬Â¢</span>}>
                    <FaArrowAltCircleRight className="mr-1 flex-shrink-0" />
                  </Suspense>

                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SuperAdminFeatures;

// import { Suspense, lazy } from "react";

// import { NavLink } from "react-router-dom";

// const FaArrowAltCircleRight = lazy(() =>
//   import("react-icons/fa").then((module) => ({
//     default: module.FaArrowAltCircleRight,
//   })),
// );

// const SuperAdminFeatures = () => {
//   const superAdminRoutesFeatures = [
//     { id: 1, route: "super-admin-dashboard", name: "Sup-Adm Dashboard" },
//     { id: 2, route: "manage-blogs", name: "Manage Blog Posts" },
//     { id: 3, route: "archived-blogs", name: "Manage Archived Posts" },
//     { id: 4, route: "coming-soon", name: "Coming Soon Posts" },
//     { id: 5, route: "scheduled-posts", name: "Scheduled Posts" },
//     { id: 6, route: "flagged-blogs", name: "Manage Flagged Posts" },
//     { id: 7, route: "manage-audit-logs", name: "Manage Audit Logs" },
//     { id: 8, route: "manage-categories", name: "Manage Categories" },
//     { id: 9, route: "manage-tags", name: "Manage Tags" },
//     { id: 10, route: "manage-roles", name: "Manage Roles" },
//     { id: 11, route: "manage-permissions", name: "Manage Permission" },
//     { id: 12, route: "assign-roles-permissions", name: "Manage Roles Perm" },
//     { id: 13, route: "manage-profile", name: "Manage User Profile" },
//     { id: 14, route: "manage-users", name: "Manage Users" },
//     { id: 15, route: "manage-notification", name: "Manage Notifications" },
//     { id: 16, route: "manage-comments", name: "Manage Comments" },
//     { id: 17, route: "manage-messages", name: "Manage Messages" },
//     { id: 18, route: "manage-pages", name: "Manage Pages" },
//     {
//       id: 19,
//       route: "manage-follow-unfollow",
//       name: "Manage Follow Unfollow",
//     },
//   ];

//   return (
//     <div className="dark:bg-gray-800 bg-base-200 border-gray-200 rounded-b-sm dark:border-gray-700">
//       <div className="lg:space-y-1 lg:p-[15px] lg:h-[calc(100vh-145px)] lg:overflow-y-scroll lg:fixed lg:top-[146px]">
//         {superAdminRoutesFeatures?.map((path) => (
//           <NavLink
//             key={path.id}
//             to={path.route}
//             className={({ isActive }) =>
//               `m-0 flex items-center px-2 py-2 rounded-sm transition-all ${
//                 isActive
//                   ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-bold"
//                   : "hover:bg-gray-100 dark:hover:bg-gray-600 hover:font-bold"
//               }`
//             }
//           >
//             <Suspense fallback={<span>Ã°Å¸â€â€ž</span>}>
//               <FaArrowAltCircleRight className="pr-1" />
//             </Suspense>
//             {path.name}
//           </NavLink>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SuperAdminFeatures;
