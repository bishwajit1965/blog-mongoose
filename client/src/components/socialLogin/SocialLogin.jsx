import { FaGithub, FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import AuthContext from "../../authContext/AuthContext";
import Swal from "sweetalert2";
import { useContext } from "react";

const SocialLogIn = () => {
  const { signInWithGoogle } = useContext(AuthContext);
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
        title: "Successfully logged in with Google!",
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
    <div className="">
      <div className="border-t border-slate-300 dark:border-slate-700"></div>
      <div className="text-center my-2 w-full grid grid-cols-12 gap-2 justify-between">
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-circle dark:btn-info border-slate-400 dark:border-slate-600 btn-outline dark:bg-cyan-400 dark:text-base-100 my-1"
        >
          <FaGoogle className="dark:text-red-700 text-xl" />
        </button>
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-circle dark:btn-info border-slate-400 dark:border-slate-600 btn-outline dark:bg-cyan-400 dark:text-base-100 my-1"
        >
          <FaGithub className="dark:text-red-700 text-xl" />
        </button>
      </div>
    </div>
  );
};

export default SocialLogIn;
