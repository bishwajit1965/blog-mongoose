import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="lg:min-h-[calc(100vh-188px)] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-red-500 mb-4">
        Unauthorized Access
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        You do not have the required permissions to access this page.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default Unauthorized;
