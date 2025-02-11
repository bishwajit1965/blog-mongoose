import AdminSubTitle from "../adminSubTitle/AdminSubTitle";
import WriterDashboardCard from "./WriterDashboardCard";
import useAdminAuth from "../../adminHooks/useAdminAuth";

const WriterDashboard = () => {
  const len = 20;
  const { loading, isAuthenticated, adminData } = useAdminAuth();
  return (
    <div>
      <AdminSubTitle subTitle="Writer dashboard" dataLength={len} />
      <div className="grid lg:grid-cols-12 grid-cols-1 justify-between gap-4 p-2">
        <WriterDashboardCard
          isAuthenticated={isAuthenticated}
          adminData={adminData}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default WriterDashboard;
