import AdminSubTitle from "../adminSubTitle/AdminSubTitle";
import EditorDashboardCard from "./EditorDashboardCard";
import useAdminAuth from "../../adminHooks/useAdminAuth";

const EditorDashboard = () => {
  const len = 20;
  const { loading, isAuthenticated, adminData } = useAdminAuth();
  return (
    <div>
      <AdminSubTitle subTitle="Editor dashboard" dataLength={len} />
      <div className="grid lg:grid-cols-12 grid-cols-1 justify-between gap-4 p-2">
        <EditorDashboardCard
          isAuthenticated={isAuthenticated}
          adminData={adminData}
          loading={loading}
        />
        <EditorDashboardCard
          isAuthenticated={isAuthenticated}
          adminData={adminData}
          loading={loading}
        />
        <EditorDashboardCard
          isAuthenticated={isAuthenticated}
          adminData={adminData}
          loading={loading}
        />
        <EditorDashboardCard
          isAuthenticated={isAuthenticated}
          adminData={adminData}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EditorDashboard;
