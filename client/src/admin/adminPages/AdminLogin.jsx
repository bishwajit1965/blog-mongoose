import CTAButton from "../../components/buttons/CTAButton";
import { FaSignInAlt } from "react-icons/fa";
import { useState } from "react";

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true); // Set loading state to true
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="h-screen flex items-center">
      <div className="mx-auto">
        <div className="border border-slate-300 shadow-md bg-base-300 p-6 rounded-md">
          <div className="">
            <h1 className="text-xl font-bold pb-2">Admin Login</h1>
          </div>
          <form>
            <input
              type="email"
              placeholder="Enter Super Admin Email"
              className="input input-bordered input-sm w-full mb-2 max-w-full"
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered input-sm w-full mb-2 max-w-full"
              required
            />
            <div className="">
              {/* <button
                onClick={handleLogin}
                type="submit"
                className="btn btn-sm btn-active btn-primary"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <FaSignInAlt />
                )}
                {loading ? " Logging in..." : " Login"}
              </button> */}
              <CTAButton
                onClick={handleLogin}
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
  );
};

export default AdminLogin;
