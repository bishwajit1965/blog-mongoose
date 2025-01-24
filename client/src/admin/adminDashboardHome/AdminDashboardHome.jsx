import AdminDashboardHomeCard from "./AdminDashboardHomeCard";
import { Helmet } from "react-helmet-async";
import useAdminAuth from "../adminHooks/useAdminAuth";

const AdminDashboardHome = () => {
  const { loading, isAuthenticated, adminData } = useAdminAuth();
  return (
    <>
      <Helmet title="Blog || Admin Home Dashboard" />
      <div className="grid lg:grid-cols-12 grid-cols-1 justify-between gap-4 p-2">
        <AdminDashboardHomeCard
          isAuthenticated={isAuthenticated}
          adminData={adminData}
          loading={loading}
        />
        <AdminDashboardHomeCard
          isAuthenticated={isAuthenticated}
          adminData={adminData}
          loading={loading}
        />
        <AdminDashboardHomeCard
          isAuthenticated={isAuthenticated}
          adminData={adminData}
          loading={loading}
        />
        <AdminDashboardHomeCard
          isAuthenticated={isAuthenticated}
          adminData={adminData}
          loading={loading}
        />
      </div>
    </>
  );
};

export default AdminDashboardHome;
