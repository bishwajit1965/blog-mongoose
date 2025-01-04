import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="lg:max-w-7xl mx-auto">
      <div className="">
        <Navbar />
      </div>

      <div className="lg:py-10 py-2 lg:px-0 px-2">
        <Outlet />
      </div>

      <div className="bg-slate-800">
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
