import { FaEye, FaEyeSlash, FaUserAlt, FaUserCircle } from "react-icons/fa";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { useContext, useState } from "react";

import AuthContext from "../../authContext/AuthContext";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loading, registerUserWithEmailAndPassword } = useContext(AuthContext);

  // Register user
  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const acceptedTerms = form.terms.checked;
    console.log(name, email, password, acceptedTerms);

    setError("");
    setSuccess("");

    if (password.trim() === "") {
      setError("Password field is empty!");
      return;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    } else if (!acceptedTerms) {
      setError("Accept terms and conditions!");
      return;
    } else if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one small letter!");
      return;
    } else if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one digit!");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter!");
      return;
    } else {
      registerUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Registered user:", user);
          setSuccess("Registration is successful!");

          // Update profile
          updateProfile(user, {
            displayName: name,
            photoURL: "https://i.ibb.co/MgsDqCZ/FB-IMG-1678691214526.jpg",
          })
            .then(() => {
              setSuccess("Profile updated successfully!");
            })
            .catch((error) => setError(error));

          // Email verification
          sendEmailVerification(user)
            .then((userCredential) => {
              console.log(userCredential.user);
            })
            .catch((error) => {
              setError(error);
            });
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  return (
    <>
      <Helmet title="Blog || Register" />
      <div className="h-screen flex items-center">
        <div className="w-full lg:max-w-xs mx-auto lg:px-4 px-1">
          {loading && <Loader />}
          <div className="flex flex-col justify-center border lg:p-6 p-4 bg-base-200 rounded-xs shadow-xl">
            <div className="lg:space-y-4 space-y-2 w-full">
              <h1 className="text-3xl font-bold text-indigo-800">
                Please Register
              </h1>
              <form className="space-y-4" onSubmit={handleRegister}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name to update profile..."
                  className="input input-bordered input-sm w-full"
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email..."
                  className="input input-bordered input-sm w-full"
                  required
                />
                <div className="password-container relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password..."
                    className="input input-bordered input-sm w-full"
                    required
                  />
                  <span
                    className="absolute right-2 top-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    className="bg-indigo-500"
                  />
                  <label htmlFor="terms" className="text-xs ml-1 hover:link">
                    Accept terms & conditions
                    <Link
                      to="/terms-conditions"
                      className="text-indigo-600 hover:underline link-primary ml-text-xm "
                    >
                      {" "}
                      View Terms
                    </Link>
                  </label>
                </div>
                <div className="">
                  <p className="text-xs p-0">
                    <Link to="/login" className="hover:link ml-0">
                      Already registered ?
                      <span className="link-primary text-sm"> Login</span>
                    </Link>
                  </p>
                </div>

                <div className="">
                  {error && (
                    <p className="text-xs text-red-500">{error.message}</p>
                  )}
                  {success && (
                    <p className="text-sm text-green-500">{success}</p>
                  )}
                </div>
                <div className="">
                  <button className="btn btn-sm w-full btn-primary">
                    <FaUserAlt /> Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
