import {
  FaEye,
  FaEyeSlash,
  FaGithub,
  FaGoogle,
  FaSignInAlt,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { hideErrorElements, hideSuccessElements } from "../../hooks/useHelpers";
import { useContext, useRef, useState } from "react";

import AuthContext from "../../authContext/AuthContext";
import { Helmet } from "react-helmet-async";
import Loader from "../../components/loader/Loader";
import Swal from "sweetalert2";
import { sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);

  // Redirect to desired route
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    user,
    auth,
    loading,
    signInWithEmailPassword,
    signInWithGoogle,
    signInWithGitHub,
  } = useContext(AuthContext);

  const handleGoogleLogIn = async () => {
    try {
      await signInWithGoogle()
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Logged in user:", user);
          navigate(from, { replace: true });
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login successful!",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          console.error("Error during Google Sign-In:", error.message);
        });
    } catch (error) {
      console.error("Error during Google Sign-In:", error.message);
    }
  };

  const handleGitHubLogin = async () => {
    await signInWithGitHub()
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in user:", user);
        console.log("Logged in user token:", user.getIdToken());
        navigate(from, { replace: true });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error during GitHub Sign-In:", error.message);
      });
  };

  const handleLogIn = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    setError("");
    setSuccess("");

    await signInWithEmailPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        const loggedIndUser = userCredential.user;
        if (loggedIndUser.emailVerified) {
          setSuccess("User log in is successful!");
          hideSuccessElements();
        } else {
          alert("Please verify your email address.");
        }
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
        hideErrorElements();
      });
  };

  const handleResetPassword = async () => {
    console.log(emailRef.current.value);
    const email = emailRef.current.value;
    if (!email) {
      alert("Email field is empty!");
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      alert("Please write a valid email address!");
      return;
    } else {
      try {
        await sendPasswordResetEmail(auth, email);
        setSuccess("Password reset email sent successfully!");
        hideSuccessElements();
      } catch (error) {
        setError(error.message);
        hideErrorElements();
      }
    }
  };

  return (
    <>
      <Helmet title="Blog || Login" />
      <div className="h-screen flex items-center">
        <div className="lg:max-w-xs w-full mx-auto">
          {loading && <Loader />}
          <div className="flex flex-col justify-center border lg:p-6 p-4 bg-base-200 rounded-xs shadow-xl">
            <h1 className="text-2xl lg:text-3xl font-bold text-indigo-800 text-center mb-4">
              Blog User Login
            </h1>
            {user ? (
              <p className="text-center mb-4">User email: {user?.email}</p>
            ) : (
              ""
            )}
            <form onSubmit={handleLogIn} className="space-y-4">
              <input
                type="email"
                name="email"
                ref={emailRef}
                id="email"
                placeholder="Email for login & reset password..."
                className="input input-bordered input-sm w-full"
              />
              <div className="password-container relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password..."
                  className="input input-bordered input-sm w-full"
                  required
                />
                <span
                  className="absolute right-2 top-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {error && (
                <p id="error-message" className="text-xs text-red-500">
                  {error}
                </p>
              )}
              {success && (
                <p id="success-message" className="text-sm text-green-500">
                  {success}
                </p>
              )}
              <button className="btn btn-sm w-full btn-primary">
                <FaSignInAlt /> Login
              </button>
            </form>
            <div className="mt-4 space-y-2">
              <p className="text-xs hover:link">
                <Link
                  onClick={handleResetPassword}
                  className="hover:link-primary"
                >
                  Forgot password ? {""}
                  <span className="text-xs link-primary">
                    Reset password here
                  </span>
                </Link>
              </p>
              <p className="text-xs">
                <Link to="/register" className="hover:link">
                  New to this site ? {""}
                  <span className="text-xs link-primary">Register here</span>
                </Link>
              </p>
            </div>
            <div className="divider my-4">OR</div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleGoogleLogIn}
                className="btn btn-circle btn-outline btn-sm shadow-lg"
              >
                <FaGoogle />
              </button>
              <button
                onClick={handleGitHubLogin}
                className="btn btn-circle btn-outline btn-sm shadow-lg"
              >
                <FaGithub />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
