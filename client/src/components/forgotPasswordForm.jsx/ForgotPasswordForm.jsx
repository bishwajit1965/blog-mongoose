import { useRef, useState } from "react";
import { hideErrorElements, hideSuccessElements } from "../../hooks/useHelpers";
import { ArrowLeft, KeyRound, Loader, Mail, Send } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { auth, loading, resetPassword } = useAuth();
  const emailRef = useRef(null);

  // Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const email = emailRef?.current?.value;
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
        await resetPassword(auth, email);
        setSuccess("Password reset email sent ! Check your mail.");
        hideSuccessElements();
      } catch (error) {
        setError(error.message);
        hideErrorElements();
      }
    }
  };
  return (
    <>
      <div className="max-w-sm mx-auto h-screen flex items-center">
        <form
          onSubmit={handleResetPassword}
          className="space-y-4 items-center lg:p-8 p-4 border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-400 rounded-xl shadow-lg hover:shadow-xl"
        >
          {/* Loading */}
          {loading && (
            <div className="flex justify-center mb-4">
              <Loader size={20} className="animate-spin text-primary" />
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              id="error-message"
              className="
              mb-4 rounded-lg border border-red-200
              bg-red-50 dark:bg-red-950/20
              px-3 py-2
              text-xs text-red-600 dark:text-red-400
            "
            >
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div
              id="success-message"
              className="
              mb-4 rounded-lg border border-green-200
              bg-green-50 dark:bg-green-950/20
              px-3 py-2
              text-sm text-green-600 dark:text-green-400
            "
            >
              {success}
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-7">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 dark:bg-gray-300 text-primary">
              <KeyRound size={23} />
            </div>

            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Forgot Your Password?
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Enter the email address associated with your account and we will
              send you a link to reset your password.
            </p>
          </div>

          <div className="relative">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              placeholder="Enter your email..."
              className=" input input-bordered input-sm
                w-full pl-9
                bg-white dark:bg-gray-800
                dark:border-gray-700
                dark:text-gray-300
                focus:outline-none
                focus:border-primary"
              required
            />
            <span className="absolute left-3 top-[34px]">
              <Mail size={14} />
            </span>
          </div>

          <button type="submit" className="btn btn-sm btn-primary w-full">
            {loading ? (
              <Loader size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}

            {loading ? "Sending..." : "Send for Reset Link"}
          </button>

          {/* Back to login */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="
              inline-flex items-center gap-1.5
              text-xs
              text-gray-500 dark:text-gray-400
              hover:text-primary
              transition-colors
            "
            >
              <ArrowLeft size={14} />
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
