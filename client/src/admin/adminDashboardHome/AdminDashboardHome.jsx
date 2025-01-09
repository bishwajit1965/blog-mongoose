import AdminDashboardHomeCard from "./AdminDashboardHomeCard";

const AdminDashboardHome = () => {
  return (
    <div className="grid lg:grid-cols-12 grid-cols-1 justify-between gap-4">
      <AdminDashboardHomeCard />
      <AdminDashboardHomeCard />
      <AdminDashboardHomeCard />
      <AdminDashboardHomeCard />
    </div>
  );
};

export default AdminDashboardHome;
