import AdminLoader from "../adminLoader/AdminLoader";

const AdminDashboardCard = ({ loading, isAuthenticated, adminData }) => {
  if (loading) return <AdminLoader />;

  return (
    <div className="lg:col-span-3 col-span-12 rounded-md shadow-md dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
      <div className="bg-base-300 text-center p-2 dark:bg-gray-700">
        <h1 className="text-xl font-bold">Blog Posts Details</h1>
      </div>
      <div className="p-2">
        {isAuthenticated && adminData ? (
          <>
            <p>Email: {adminData?.user?.email || "N/A"}</p>
            <p>
              Role:{" "}
              {adminData?.user?.roles && Array.isArray(adminData.user.roles) ? (
                adminData.user.roles.map((role) =>
                  role?._id && role?.name ? (
                    <span key={role._id} className="inline-block mx-1">
                      {role.name}
                    </span>
                  ) : null
                )
              ) : (
                <span>No roles</span>
              )}
            </p>
            <p>Authenticated: {isAuthenticated.toString()}</p>
          </>
        ) : (
          <p>Not authenticated</p>
        )}
      </div>

      <div className="p-2">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
          explicabo nostrum iusto quod ipsum adipisci voluptates.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboardCard;
