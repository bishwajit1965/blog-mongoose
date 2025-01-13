import { FaGithub, FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const SocialLogIn = () => {
  const { signInWithGoogle, signInWithGitHub } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = async (event) => {
    event.preventDefault();
    try {
      const result = await signInWithGoogle();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Google login successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });

      if (result && result.user) {
        const loggedInUser = result.user;
        const saveUser = {
          name: loggedInUser.displayName,
          email: loggedInUser.email,
        };
        // Send user data to the backend
        await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(saveUser),
        });
      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login failed! Please try again.",
      });
    }
  };

  const handleGitHubSignIn = async (event) => {
    event.preventDefault();

    try {
      const result = await signInWithGitHub();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "GitHub login is successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });

      if (result && result.user) {
        const loggedInUser = result.user;
        const saveUser = {
          name: loggedInUser.displayName,
          email: loggedInUser.email,
        };
        // Send user data to the backend
        await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(saveUser),
        });
      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login failed! Please try again.",
      });
    }
  };

  return (
    <div className="text-center w-full flex justify-center space-x-4">
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-sm btn-circle dark:btn-info border-slate-400 dark:border-slate-600 btn-outline dark:bg-cyan-400 dark:text-base-100 my-1"
      >
        <FaGoogle className="dark:text-red-700 text-xl" />
      </button>
      <button
        onClick={handleGitHubSignIn}
        className="btn btn-sm btn-circle dark:btn-info border-slate-400 dark:border-slate-600 btn-outline dark:bg-cyan-400 dark:text-base-100 my-1"
      >
        <FaGithub className="dark:text-red-700 text-xl" />
      </button>
    </div>
  );
};

export default SocialLogIn;
