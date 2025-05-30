import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="lg:max-w-7xl mx-auto">
      <Navbar />

      <div className="pt-[4.75rem] flex flex-col">
        <div className="lg:gap-4 lg:min-h-[calc(100vh-120px)] lg:py-8 py-4 lg:px-0 px-2 dark:bg-gray-800 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:text-gray-200 text-gray-700">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
