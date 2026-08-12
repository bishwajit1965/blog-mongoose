import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeButton = () => {
  return (
    <div>
      <Link to="/">
        <div
          className="tooltip fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 z-50 text-orange-500 px-3 py-1 shadow-lg h-10 w-10 opacity-50 rounded-full border border-gray-400 flex items-center justify-center"
          data-tip="Go Home Page"
        >
          <FaArrowLeft className="text-gray-500 text-xl" />
        </div>
      </Link>
    </div>
  );
};

export default HomeButton;
