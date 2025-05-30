import { Suspense, lazy } from "react";

import { NavLink } from "react-router-dom";

const FaArrowAltCircleRight = lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaArrowAltCircleRight,
  }))
);

const WriterFeatures = () => {
  const writerRoutesFeatures = [
    { id: 1, route: "writer-dashboard", name: "Writer Dashboard" },
    { id: 2, route: "manage-blogs", name: "Manage Blog Posts" },
  ];

  return (
    <div className="dark:bg-gray-800 bg-base-200 border-b border-gray-200 shadow-sm rounded-b-sm dark:border-gray-700">
      <div className="lg:space-y-2 p-2">
        {writerRoutesFeatures.map((path) => (
          <NavLink
            key={path.id}
            to={path.route}
            className={({ isActive }) =>
              `m-0 flex items-center px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-bold"
                  : "hover:bg-gray-100 dark:hover:bg-gray-600 hover:font-bold"
              }`
            }
          >
            <Suspense fallback={<span>🔄</span>}>
              <FaArrowAltCircleRight className="mr-2" />
            </Suspense>
            {path.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default WriterFeatures;
