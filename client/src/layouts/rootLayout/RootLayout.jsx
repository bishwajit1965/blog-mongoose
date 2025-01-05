import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="lg:max-w-7xl mx-auto">
      <div className="">
        <Navbar />
      </div>

      <div className="pt-24 border dark:border-slate-800 overflow-y-auto lg:min-h-[calc(100vh-63px)] mb-5">
        <div className="dark:bg-gray-800 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:text-gray-400 text-gray-700 rounded-md">
          <Outlet />
        </div>
      </div>

      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
