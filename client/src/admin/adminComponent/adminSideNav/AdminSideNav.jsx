import AdminFeatures from "../roleSpecificFeatures/AdminFeatures";
import EditorFeatures from "../roleSpecificFeatures/EditorFeatures";
import SuperAdminFeatures from "../roleSpecificFeatures/SuperAdminFeatures";
import WriterFeatures from "../roleSpecificFeatures/WriterFeatures";
import useAdminAuth from "../../adminHooks/useAdminAuth";

const AdminSideNav = () => {
  const { isAuthenticated, adminData } = useAdminAuth();

  if (!isAuthenticated || !adminData) return null; // Return null if not authenticated

  // Function to check if the user has a specific role
  const hasRole = (role) => {
    return (
      Array.isArray(adminData?.user?.roles) &&
      adminData.user.roles.some(
        (userRole) => userRole.name.toLowerCase() === role.toLowerCase()
      )
    );
  };

  return (
    <div className="dark:bg-gray-800 bg-base-">
      <div className="lg:py-[24.2px] bg-base-300 text-gray-800 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 shadow-md">
        {/* Role-based title display */}
        {hasRole("super-admin") && (
          <h1 className="font-bold text-md text-gray-800 text-center dark:text-gray-400">
            Super Admin Navigation
          </h1>
        )}
        {hasRole("admin") && (
          <h1 className="font-bold text-md text-gray-800 text-center dark:text-gray-400">
            Admin Navigation
          </h1>
        )}
        {hasRole("editor") && (
          <h1 className="font-bold text-md text-gray-800 text-center dark:text-gray-400">
            Editor Navigation
          </h1>
        )}
        {hasRole("writer") && (
          <h1 className="font-bold text-md text-gray-800 text-center">
            Writer Navigation
          </h1>
        )}
      </div>
      <div className="lg:space-y-2 p- bg-base-300">
        {/* Role-based features display */}
        {hasRole("super-admin") && <SuperAdminFeatures />}
        {hasRole("admin") && <AdminFeatures />}
        {hasRole("editor") && <EditorFeatures />}
        {hasRole("writer") && <WriterFeatures />}
      </div>
    </div>
  );
};

export default AdminSideNav;

// import AdminFeatures from "../roleSpecificFeatures/AdminFeatures";
// import EditorFeatures from "../roleSpecificFeatures/EditorFeatures";
// import SuperAdminFeatures from "../roleSpecificFeatures/SuperAdminFeatures";
// import WriterFeatures from "../roleSpecificFeatures/WriterFeatures";
// import useAdminAuth from "../../adminHooks/useAdminAuth";

// const AdminSideNav = () => {
//   const { isAuthenticated, adminData } = useAdminAuth();

//   if (!isAuthenticated || !adminData) return null; // Return null if not authenticated

//   // Function to check if the user has a specific role
//   const hasRole = (role) => {
//     return (
//       Array.isArray(adminData?.user?.roles) &&
//       adminData.user.roles.some(
//         (userRole) => userRole.name.toLowerCase() === role.toLowerCase()
//       )
//     );
//   };

//   // Map roles to components
//   const roleToComponent = {
//     "super-admin": <SuperAdminFeatures />,
//     admin: <AdminFeatures />,
//     editor: <EditorFeatures />,
//     writer: <WriterFeatures />,
//   };

//   // Get the user's role and corresponding component
//   const role = adminData.user?.roles[0]?.name.toLowerCase(); // Assuming one role per user, adjust if needed
//   const Component = roleToComponent[role] || null; // Default to null if no role matches

//   return (
//     <div className="dark:bg-gray-800 bg-base-">
//       <div className="lg:py-[24.2px] bg-base-300 text-gray-800 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 shadow-md">
//         {Component && (
//           <h1 className="font-bold text-md text-gray-800 text-center dark:text-gray-400">
//             {role.charAt(0).toUpperCase() + role.slice(1)} Navigation
//           </h1>
//         )}
//       </div>
//       <div className="lg:space-y-2 p- bg-base-300">{Component}</div>
//     </div>
//   );
// };

// export default AdminSideNav;

// import AdminFeatures from "../roleSpecificFeatures/AdminFeatures";
// import EditorFeatures from "../roleSpecificFeatures/EditorFeatures";
// import SuperAdminFeatures from "../roleSpecificFeatures/SuperAdminFeatures";
// import WriterFeatures from "../roleSpecificFeatures/WriterFeatures";
// import useAdminAuth from "../../adminHooks/useAdminAuth";

// const AdminSideNav = () => {
//   const { isAuthenticated, adminData } = useAdminAuth();
//   if (!isAuthenticated || !adminData) return;

//   return (
//     <div className="dark:bg-gray-800 bg-base-">
//       <div className="lg:py-[24.2px] bg-base-300 text-gray-800 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 shadow-md">
//         {Array.isArray(adminData?.user?.roles) &&
//         adminData.user.roles.some(
//           (role) => role.name.toLowerCase() === "super-admin"
//         ) ? (
//           <h1 className="font-bold text-md text-gray-800 text-center dark:text-gray-400">
//             Super Admin Navigation
//           </h1>
//         ) : Array.isArray(adminData?.user?.roles) &&
//           adminData.user.roles.some(
//             (role) => role.name.toLowerCase() === "admin"
//           ) ? (
//           <h1 className="font-bold text-md text-gray-800 text-center dark:text-gray-400">
//             {" "}
//             Admin Navigation
//           </h1>
//         ) : Array.isArray(adminData?.user?.roles) &&
//           adminData.user.roles.some(
//             (role) => role.name.toLowerCase() === "editor"
//           ) ? (
//           <h1 className="font-bold text-md text-gray-800 text-center dark:text-gray-400">
//             {" "}
//             Editor Navigation
//           </h1>
//         ) : Array.isArray(adminData?.user?.roles) &&
//           adminData.user.roles.some(
//             (role) => role.name.toLowerCase() === "writer"
//           ) ? (
//           <h1 className="font-bold text-md text-gray-800 text-center">
//             {" "}
//             Writer Navigation
//           </h1>
//         ) : (
//           ""
//         )}
//       </div>
//       <div className="lg:space-y-2 p- bg-base-300">
//         {Array.isArray(adminData?.user?.roles) &&
//         adminData.user.roles.some(
//           (role) => role.name.toLowerCase() === "super-admin"
//         ) ? (
//           <SuperAdminFeatures />
//         ) : Array.isArray(adminData?.user?.roles) &&
//           adminData.user.roles.some(
//             (role) => role.name.toLowerCase() === "admin"
//           ) ? (
//           <AdminFeatures />
//         ) : Array.isArray(adminData?.user?.roles) &&
//           adminData.user.roles.some(
//             (role) => role.name.toLowerCase() === "editor"
//           ) ? (
//           <EditorFeatures />
//         ) : Array.isArray(adminData?.user?.roles) &&
//           adminData.user.roles.some(
//             (role) => role.name.toLowerCase() === "writer"
//           ) ? (
//           <WriterFeatures />
//         ) : (
//           ""
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminSideNav;
