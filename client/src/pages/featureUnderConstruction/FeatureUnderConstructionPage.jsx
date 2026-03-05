import { Link } from "react-router-dom";
import { Construction } from "lucide-react";
import { FaHome } from "react-icons/fa";

const FeatureUnderConstructionPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md">
        <Construction className="mx-auto text-yellow-500 w-16 h-16 mb-6 animate-bounce" />
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Feature Under Construction
        </h1>
        <p className="text-gray-600 mb-6">
          This section is coming soon! 🚀 We’re working hard to make it
          available for you.
        </p>
        <Link
          to="/"
          className="btn btn-md flex bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition items-center gap-2 text-center"
        >
          <FaHome /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default FeatureUnderConstructionPage;
