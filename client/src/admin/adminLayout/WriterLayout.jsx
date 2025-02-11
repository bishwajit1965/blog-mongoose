import AdminFooter from "../adminComponent/adminFooter/AdminFooter";
import AdminNavbar from "../adminComponent/adminNavbar/AdminNavbar";
import AdminPageTitle from "../adminComponent/adminPageTitle/AdminPageTitle";
import AdminSideNav from "../adminComponent/adminSideNav/AdminSideNav";
import AdminSubTitle from "../adminComponent/adminSubTitle/AdminSubTitle";
import { Outlet } from "react-router-dom";

const WriterLayout = () => {
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
              title="Writer"
              decoratedText="Panel"
              subtitle="Writer only page."
            />
          </div>

          <div className="lg:min-h-[calc(100vh-188px)]">
            <AdminSubTitle />
            <Outlet />
          </div>

          <div className="">
            <AdminFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriterLayout;
