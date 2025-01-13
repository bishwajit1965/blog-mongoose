import { FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import { hideErrorElements, hideSuccessElements } from "../../hooks/useHelpers";
import { useEffect, useRef, useState } from "react";

import { Helmet } from "react-helmet-async";
import Loader from "../../components/loader/Loader";
import SocialLogIn from "../../components/socialLogin/SocialLogin";
import Swal from "sweetalert2";
import { sendPasswordResetEmail } from "firebase/auth";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);

  // Redirect to desired route
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Recaptcha
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const { user, auth, loading, signInWithEmailPassword } = useAuth();

  const handleLogIn = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");
    setSuccess("");

    try {
      const userCredential = await signInWithEmailPassword(email, password);
      console.log("User Credential:", userCredential);
      const loggedInUser = userCredential.user;
      if (loggedInUser.emailVerified === true) {
        setSuccess("User login is successful!");
        hideSuccessElements();
      } else {
        alert("Please verify your email address.");
      }
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login is successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
      form.reset();
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error.message);
      hideErrorElements();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login failed! Please try again.",
      });
    } finally {
      form.reset();
    }
  };

  // Reset password
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

  const handleValidateCaptcha = (event) => {
    event.preventDefault();
    const user_captcha_value = captchaRef.current.value;
    if (validateCaptcha(user_captcha_value) == true) {
      setDisabled(false);
      alert("Captcha Matched.");
    } else if (user_captcha_value.trim() === "") {
      alert("Fill up captcha.");
      setDisabled(true);
    } else {
      alert("Captcha Does Not Match.");
      setDisabled(true);
    }
  };

  return (
    <>
      <Helmet title="Blog || Login" />
      <div className="h-screen flex items-center">
        <div className="lg:max-w-xs w-full mx-auto">
          {loading && <Loader />}
          <div className="flex flex-col justify-center border lg:p-6 p-4 bg-base-200 rounded-xs shadow-xl">
            <h1 className="text-2xl lg:text-2xl font-bold text-indigo-800 text-center mb-4">
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
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  name="captcha"
                  ref={captchaRef}
                  className="input input-bordered h-8 dark:bg-slate-700 dark:border-slate-500"
                  placeholder="Type the captcha above..."
                />
                <button
                  onClick={handleValidateCaptcha}
                  className="btn btn-outline border-slate-400 btn-sm mt-6 dark:text-slate-200"
                >
                  Validate
                </button>
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
              <button
                disabled={disabled}
                className="btn btn-sm w-full btn-primary"
              >
                <FaSignInAlt /> Login
              </button>
            </form>

            <div className="divider my-4">OR</div>
            <div className="flex justify-center">
              <SocialLogIn />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
