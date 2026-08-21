import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import useSystemSettings from "../../hooks/useSystemSettings";

const RootLayout = () => {
  const { systemSettings } = useSystemSettings();
  return (
    <div className="lg:max-w-full mx-auto">
      <Navbar systemSettings={systemSettings} />

      <div className="lg:max-w-full mx-auto">
        <div className="pt-[5rem]">
          <div className="lg:min-h-[calc(100vh-80px)] lg:py-8 py-6 bg-slate-50 dark:bg-gray-900">
            <Outlet />
          </div>
        </div>
      </div>

      <Footer systemSettings={systemSettings} />
    </div>
  );
};

export default RootLayout;
