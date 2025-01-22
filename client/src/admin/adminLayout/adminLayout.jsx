import AdminFooter from "../adminFooter/AdminFooter";
import AdminNavbar from "../adminNavbar/AdminNavbar";
import AdminPageTitle from "../adminPageTitle/AdminPageTitle";
import AdminSideNav from "../adminSideNav/AdminSideNav";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="lg:max-w-7xl mx-auto">
      <AdminNavbar />

      <div className="grid lg:grid-cols-12 grid-cols-1 justify-between">
        <div className="lg:col-span-2 col-span-12 bg-base-200 dark:bg-gray-800">
          <AdminSideNav />
        </div>

        <div className="lg:col-span-10 col-span-12 border border-b-rounded-md dark:border-gray-700">
          <div className="bg-base-">
            <AdminPageTitle
              title="Admin"
              decoratedText="Panel"
              subtitle="Admin only page."
            />
          </div>

          <div className="lg:min-h-[calc(100vh-188px)]">
            <Outlet />
          </div>

          <div className="bg-base-300 text-slate-800 text-center">
            <AdminFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
