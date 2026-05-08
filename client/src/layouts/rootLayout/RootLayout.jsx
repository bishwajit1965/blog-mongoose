import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="lg:max-w-full mx-auto">
      <Navbar />

      <div className="lg:max-w-7xl mx-auto">
        <div className="pt-[4.75rem]  ">
          <div className="lg:gap-4 lg:min-h-[calc(100vh-210px)] lg:py-8 py-4 lg:px-4 px-2 dark:bg-gray-900s text-gray-700 dark:text-gray-200">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
