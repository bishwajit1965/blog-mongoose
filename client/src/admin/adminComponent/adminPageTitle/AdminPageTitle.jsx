import useAdminAuth from "../../adminHooks/useAdminAuth";

const AdminPageTitle = ({ title, decoratedText, subtitle }) => {
  const { isAuthenticated, adminData } = useAdminAuth();

  // If user is not authenticated or no admin data exists, render null
  if (!isAuthenticated || !adminData) return null;

  // Extract roles and convert to lowercase for consistency
  const userRoles = Array.isArray(adminData?.user?.roles)
    ? adminData.user.roles.map((role) => role.name.toLowerCase())
    : [];

  // Determine the role-based title
  const roleBasedTitle = userRoles.includes("super-admin")
    ? title
    : userRoles.includes("admin")
    ? "Admin"
    : userRoles.includes("editor")
    ? "Editor"
    : userRoles.includes("writer")
    ? "Writer"
    : "User";

  // Determine the role-based subtitle
  const roleBasedSubtitle = userRoles.includes("super-admin")
    ? subtitle
    : userRoles.includes("admin")
    ? subtitle
    : userRoles.includes("editor")
    ? "Editor only page!"
    : userRoles.includes("writer")
    ? "Writer only page!"
    : "Welcome to the platform!";

  return (
    <div className="text-center border-b border-slate-300 dark:border-gray-700 shadow-sm bg-base-300 pb-2 dark:bg-gray-800">
      <h2 className="lg:text-2xl text-1xl font-extrabold dark:text-emerald-400">
        <span className="lg:text-2xl text-1zl font-extrabold text-orange-700 dark:text-amber-400">
          Welcome to{" "}
        </span>
        {roleBasedTitle}{" "}
        <span className="text-orange-700 dark:text-amber-400">
          {decoratedText}
        </span>
      </h2>
      {subtitle && (
        <p className="lg:pb-1 text-md font-serif max-w-3xl mx-auto hidden lg:block dark:text-emerald-400">
          {roleBasedSubtitle}
        </p>
      )}
      <div className="w-20 h-1 shadow-md mx-auto bg-orange-900 dark:bg-emerald-400 hidden lg:block rounded-md"></div>
    </div>
  );
};

export default AdminPageTitle;
