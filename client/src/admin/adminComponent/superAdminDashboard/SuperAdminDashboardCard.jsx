import AdminCardTitle from "../../adminCardTitle/AdminCardTitle";
import AdminLoader from "../adminLoader/AdminLoader";

const SuperAdminDashboardCard = ({ loading, isAuthenticated, adminData }) => {
  if (loading) return <AdminLoader />;

  return (
    <div className="lg:col-span-6 col-span-12 rounded-md shadow-md dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
      <AdminCardTitle subTitle="Super" decoratedText="Admin Details" />
      <div className="p-2">
        {isAuthenticated && adminData ? (
          <>
            <div className="flex justify-center">
              <img
                src={adminData.user.avatar}
                alt={adminData.user.name}
                className="w-24 rounded-full shadow-md"
              />
            </div>
            <p className="text-xl font-bold">
              Name: {adminData?.user?.name || "N/A"}
            </p>
            <p className="text-md font-bold">
              Id: {adminData?.user?._id || "N/A"}
            </p>

            <p className="text-md font-bold">
              Email: {adminData?.user?.email || "N/A"}
            </p>
            <p className="text-md font-bold">
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
            <p className="text-md font-bold">
              Authenticated: {isAuthenticated.toString()}
            </p>
          </>
        ) : (
          <p>Not authenticated</p>
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboardCard;
