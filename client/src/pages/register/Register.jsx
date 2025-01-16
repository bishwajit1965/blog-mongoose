import { FaEye, FaEyeSlash, FaUserAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import Loader from "../../components/loader/Loader";
import Swal from "sweetalert2";
import { sendEmailVerification } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Register = () => {
  const { user, loading, registerUserWithEmailAndPassword, updateUserProfile } =
    useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
  const {
    register,
    handleSubmit,
    // setError: setFormError,
    reset,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    console.log("Sign up data", data);
    if (!data.terms) {
      setError("You must accept the terms and conditions.");
      return;
    }

    registerUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name, data.photoURL).then(() => {
          const saveUser = {
            firebaseUid: user.uid,
            name: data.name,
            email: data.email,
            avatar: data.photoURL,
            password: data.password,
            roles: ["user"],
          };

          fetch(`${baseUrl}/users`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(saveUser),
          });
        });
      })
      .then(() => {
        sendEmailVerification(data.email);
        setSuccess("Verification email sent! Check your inbox.");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User profile updated! Verify email!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Helmet title="Blog || Register" />
      <div className="h-screen flex items-center">
        <div className="w-full lg:max-w-xs mx-auto">
          {loading && <Loader />}
          {!loading && (
            <div className="flex flex-col justify-center border lg:p-6 p-4 bg-base-200 rounded-xs shadow-xl">
              <div className="lg:space-y-4 space-y-2 w-full">
                <h1 className="text-2xl font-bold text-indigo-800">
                  Please Register
                </h1>
                <form
                  className="space-y-2"
                  onSubmit={handleSubmit(handleRegister)}
                >
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    placeholder="Name to update profile..."
                    className="input input-bordered input-sm w-full"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">
                      {errors.name.message}
                    </p>
                  )}

                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="Email..."
                    className="input input-bordered input-sm w-full"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">
                      {errors.email.message}
                    </p>
                  )}

                  <div className="password-container relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message:
                            "Password must be at least 6 characters long",
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/,
                          message:
                            "Password must contain uppercase, lowercase, and a number",
                        },
                      })}
                      placeholder="Password..."
                      className="input input-bordered input-sm w-full"
                    />
                    <span
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs">
                      {errors.password.message}
                    </p>
                  )}

                  <input
                    type="text"
                    {...register("photoURL", {
                      pattern: {
                        value:
                          /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i,
                        message: "Invalid image URL",
                      },
                    })}
                    placeholder="Photo URL (optional)"
                    className="input input-bordered input-sm w-full"
                  />
                  {errors.photoURL && (
                    <p className="text-red-500 text-xs">
                      {errors.photoURL.message}
                    </p>
                  )}

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      {...register("terms", {
                        required:
                          "Please accept the terms and conditions to continue.",
                      })}
                      className="checkbox checkbox-sm"
                    />
                    <label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link
                        to="/terms-conditions"
                        className="text-indigo-600 underline hover:text-indigo-800"
                      >
                        terms and conditions
                      </Link>
                    </label>
                  </div>
                  {errors.terms && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.terms.message}
                    </p>
                  )}

                  <div>
                    <p className="text-xs p-0">
                      <Link to="/login" className="hover:link ml-0">
                        Already registered?{" "}
                        <span className="link-primary text-sm">Login</span>
                      </Link>
                    </p>
                  </div>

                  <div>
                    {error && <p className="text-xs text-red-500">{error}</p>}
                    {success && (
                      <p className="text-sm text-green-500">{success}</p>
                    )}
                  </div>

                  <div>
                    <button className="btn btn-sm w-full btn-primary">
                      <FaUserAlt /> Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
