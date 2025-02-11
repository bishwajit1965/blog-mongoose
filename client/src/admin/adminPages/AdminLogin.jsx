import { FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AdminLoader from "../adminComponent/adminLoader/AdminLoader";
import CTAButton from "../../components/buttons/CTAButton";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAdminAuth from "../adminHooks/useAdminAuth";

const AdminLogin = () => {
  const { loginAdmin, isAuthenticated, adminData } = useAdminAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from =
    location.state?.from?.pathname || "/super-admin/super-admin-dashboard";
  console.log("Super Admin data fetched:", adminData);

  useEffect(() => {
    if (!isAuthenticated || !adminData) return;
    const userRoles =
      adminData?.roles?.map((role) => role.name.toLowerCase()) || [];

    if (userRoles.includes("super-admin")) {
      navigate(from, { replace: true });
    } else if (userRoles.includes("admin")) {
      navigate("/admin/admin-dashboard", { replace: true });
    } else if (userRoles.includes("editor")) {
      navigate("/editor/editor-dashboard", { replace: true });
    } else if (userRoles.includes("writer")) {
      navigate("/writer/writer-dashboard", { replace: true });
    } else {
      navigate("/unauthorized", { replace: true });
    }
  }, [isAuthenticated, adminData, navigate, from]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value.includes("@")) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setEmailError("");
    setPasswordError("");
    try {
      await loginAdmin({ email, password });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Admin login is successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      setEmailError(""); // Reset form
      setPasswordError("");
    } catch (error) {
      console.error("Login failed:", error);
      setEmailError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Blog || Admin Login</title>
      </Helmet>

      <div className="h-screen flex items-center">
        <div className="lg:max-w-xs w-full mx-auto">
          {loading && <AdminLoader />}
          <div className="border border-slate-300 shadow-md bg-base-300 p-6 rounded-md dark:bg-gray-900 dark:border-gray-700">
            <h1 className="text-xl font-bold pb-2">Admin Login</h1>
            {emailError && (
              <p className="text-red-500 text-xs mb-2">{emailError}</p>
            )}
            {passwordError && (
              <p className="text-red-500 text-xs mb-2">{passwordError}</p>
            )}
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Enter admin email..."
                value={email}
                onChange={handleEmailChange}
                className="input input-bordered input-sm w-full mb-2 dark:bg-gray-700"
              />
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password..."
                  value={password}
                  onChange={handlePasswordChange}
                  className="input input-bordered input-sm w-full mb-2 dark:bg-gray-700"
                />
                <span
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <CTAButton
                label="Login"
                loadingLabel="Logging in..."
                loading={loading}
                icon={<FaSignInAlt />}
                variant="primary"
                className="btn btn-sm"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
