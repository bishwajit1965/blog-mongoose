import AdminFooter from "../adminComponent/adminFooter/AdminFooter";
import AdminNavbar from "../adminComponent/adminNavbar/AdminNavbar";
import AdminPageTitle from "../adminComponent/adminPageTitle/AdminPageTitle";
import AdminSideNav from "../adminComponent/adminSideNav/AdminSideNav";
import AutoPublishNotification from "../adminComponent/autoPublishNotification/AutoPublishNotification";
import { Outlet } from "react-router-dom";

const SuperAdminLayout = () => {
  return (
    <div className="lg:max-w-full mx-auto">
      <AdminNavbar />

      <div className="grid lg:grid-cols-12 grid-cols-1 justify-between">
        <div className="lg:col-span-2 col-span-12 bg-base-200 dark:bg-gray-800 dark:text-gray-300">
          <AdminSideNav />
        </div>

        <div className="lg:col-span-10 col-span-12 border border-b-rounded-md dark:border-gray-700">
          <div className="">
            <AdminPageTitle
              title="Super Admin"
              decoratedText="Panel"
              subtitle="Super Admin only page!"
            />
          </div>

          <div className="lg:min-h-[calc(100vh-188px)] bg-white dark:bg-gray-800 dark:text-gray-300">
            <Outlet />
          </div>

          <div className="">
            <AdminFooter />
            <AutoPublishNotification />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
