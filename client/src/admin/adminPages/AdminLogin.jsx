import { FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CTAButton from "../../components/buttons/CTAButton";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAdminAuth from "../adminHooks/useAdminAuth";
import { Loader } from "lucide-react";
import { LucideIcon } from "../../components/lucideIcon/LucideIcons";

const AdminLogin = () => {
  const { loginAdmin, isAuthenticated, checkAuth, authInitialized, adminData } =
    useAdminAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from =
    location.state?.from?.pathname || "/super-admin/super-admin-dashboard";

  useEffect(() => {
    if (!authInitialized) return;
    if (!isAuthenticated) return;

    const userRoles =
      adminData?.user?.roles?.map((role) => role.name.toLowerCase()) || [];

    const roleRedirects = {
      "super-admin": from || "/super-admin/super-admin-dashboard",
      admin: "/admin/admin-dashboard",
      editor: "/editor/editor-dashboard",
      writer: "/writer/writer-dashboard",
    };

    const destinationRole = userRoles.find((role) => roleRedirects[role]);

    if (destinationRole) {
      console.log(`✅ Redirecting to: ${roleRedirects[destinationRole]}`);
      navigate(roleRedirects[destinationRole], { replace: true });
    } else {
      console.warn("🚨 No matching role found. Redirecting to Unauthorized.");
      navigate("/unauthorized", { replace: true });
    }
  }, [isAuthenticated, authInitialized, adminData, navigate, from]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setEmailError("");
    setPasswordError("");
    try {
      await loginAdmin(formData);
      await checkAuth();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Admin login is successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      setFormData({ email: "", password: "" }); // Reset form
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
          <div className="border border-slate-300 shadow-md bg-base-300 p-6 rounded-md dark:bg-gray-900 dark:border-gray-700">
            <h1 className="text-xl font-bold pb-2 flex items-center gap-2">
              <LucideIcon.LogIn size={20} />
              Admin Login{" "}
              <span className="flex justify-center items-center">
                {" "}
                {loading && <Loader className="animate-spin" />}
              </span>
            </h1>
            {emailError && (
              <p className="text-red-500 text-xs mb-2">{emailError}</p>
            )}
            {passwordError && (
              <p className="text-red-500 text-xs mb-2">{passwordError}</p>
            )}
            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Enter admin email..."
                value={formData.email}
                onChange={handleInputChange}
                className="input input-bordered input-sm w-full mb-2 dark:bg-gray-700"
              />
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password..."
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input input-bordered input-sm w-full mb-2 dark:bg-gray-700"
                />
                <span
                  role="button"
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
                type="submit" // ✅ Ensures form submission
                disabled={loading} // ✅ Prevents multiple clicks
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
