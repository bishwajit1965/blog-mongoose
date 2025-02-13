import { FaArrowAltCircleLeft, FaHome } from "react-icons/fa";

import ErrorImage from "/assets/error-2129569_1280.jpg";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div className="h-screen flex items-center justify-center dark:bg-gray-800 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-700 rounded-md">
        <div className="text-center max-w-md px-4">
          <div className="mb-6">
            <img src={ErrorImage} alt="Error 404" className="w-full" />
          </div>

          <h1 className="text-6xl font-extrabold text-red-600 mb-2">404</h1>

          <p className="text-lg font-medium mb-4 dark:text-gray-400">
            Oops! The page you are looking for does not exist.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Link
              to="/"
              className="bg-blue-600 text-white px-5 py-2 rounded-md shadow hover:bg-blue-700 transition flex items-center"
            >
              <FaHome className="mr-2" /> Go to Homepage
            </Link>
            <button
              onClick={() => window.history.back()}
              className="bg-gray-300 text-gray-700 px-5 py-2 rounded-md shadow hover:bg-gray-400 transition flex items-center"
            >
              <FaArrowAltCircleLeft className="mr-2" /> Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
