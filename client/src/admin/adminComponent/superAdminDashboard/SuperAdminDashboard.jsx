import AdminSubTitle from "../adminSubTitle/AdminSubTitle";
import SuperAdminDashboardCard from "./SuperAdminDashboardCard";
import useAdminAuth from "../../adminHooks/useAdminAuth";

const SuperAdminDashboard = () => {
  const len = 20;
  const { loading, isAuthenticated, adminData } = useAdminAuth();
  return (
    <div className="">
      <AdminSubTitle subTitle="Super Admin dashboard" dataLength={len} />
      <div className="grid lg:grid-cols-12 grid-cols-1 justify-between gap-4 p-2">
        <SuperAdminDashboardCard
          isAuthenticated={isAuthenticated}
          adminData={adminData}
          loading={loading}
        />
        <SuperAdminDashboardCard
          isAuthenticated={isAuthenticated}
          adminData={adminData}
          loading={loading}
        />
        <SuperAdminDashboardCard
          isAuthenticated={isAuthenticated}
          adminData={adminData}
          loading={loading}
        />
        <SuperAdminDashboardCard
          isAuthenticated={isAuthenticated}
          adminData={adminData}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
