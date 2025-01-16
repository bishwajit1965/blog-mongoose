import { FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CTAButton from "../../components/buttons/CTAButton";
import { Helmet } from "react-helmet-async";
import Loader from "../../components/loader/Loader";
import Swal from "sweetalert2";
import useAdminAuth from "../adminHooks/useAdminAuth";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { loginAdmin, adminData, isAuthenticated } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/admin/admin-home-dashboard";

  // Redirect if logged in
  useEffect(() => {
    if (isAuthenticated && adminData) {
      if (adminData.roles.includes("admin")) {
        navigate(from, { replace: true });
      } else if (adminData.roles.includes("editor")) {
        navigate("/editor/editor-dashboard", { replace: true });
      } else if (adminData.roles.includes("writer")) {
        navigate("/writer/writer-dashboard", { replace: true });
      } else {
        navigate("/unauthorized", { replace: true });
      }
    }
  }, [isAuthenticated, adminData, navigate, from]);

  const validateForm = () => {
    if (!email.includes("@")) {
      alert("Please enter a valid email.");
      return false;
    }
    if (password.length < 6) {
      alert("Password should be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrorMessage("");
    try {
      await loginAdmin({ email, password });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Admin login is successful!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Login failed. Please check your login credentials.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <Helmet title="Blog || Admin Login"></Helmet>
      <div className="h-screen flex items-center">
        <div className="lg:max-w-xs w-full mx-auto">
          {loading && <Loader />}
          <div className="border border-slate-300 shadow-md bg-base-300 p-6 rounded-md">
            <div className="">
              <h1 className="text-xl font-bold pb-2">Admin Login</h1>
            </div>
            <div className="">
              {errorMessage && (
                <p className="text-red-500 text-xs mb-2">{errorMessage}</p>
              )}
              {adminData && <p>{adminData.role}</p>}
            </div>
            <form className="" onSubmit={handleLogin}>
              <div className="">
                <input
                  type="email"
                  placeholder="Enter admin email..."
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered input-sm w-full mb-2 max-w-full"
                  required
                />
              </div>

              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password..."
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered input-sm w-full mb-2 max-w-full"
                  required
                />
                <span
                  className="absolute right-2 top-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="">
                <CTAButton
                  label="Login"
                  loadingLabel="Logging in..."
                  loading={loading}
                  icon={<FaSignInAlt />}
                  variant="primary"
                  className="btn btn-sm"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
