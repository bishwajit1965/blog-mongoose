import AdminNavbar from "../../admin/adminNavbar/AdminNavbar";
import AdminPageTitle from "../../admin/adminPageTitle/AdminPageTitle";
import AdminSideNav from "../../admin/adminSideNav/adminSideNav";
import Footer from "../../components/footer/Footer";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="lg:max-w-7xl mx-auto">
      <div className="">
        <AdminNavbar />
      </div>
      <div className=" bg-base-">
        <AdminPageTitle
          title="Admin"
          decoratedText="Panel"
          subtitle="Admin only page."
        />
      </div>
      <div className="grid lg:grid-cols-12 grid-cols-1 gap- justify-between">
        <div className="lg:col-span-3 col-span-12 bg-base-200 p-2">
          <h2 className="text-xl font-bold border-b border-slate-300 mb-2 pb-2">
            Admin Dashboard
          </h2>
          <AdminSideNav />
        </div>
        <div className="lg:col-span-9 col-span-12 border border-b-rounded-md p-2 bg-base-100">
          <Outlet />
        </div>
      </div>

      <div className="bg-base-300 text-slate-800 text-center">
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
