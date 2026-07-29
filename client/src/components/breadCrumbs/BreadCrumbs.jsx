import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav
      aria-label="breadcrumb"
      className="w-full px-2 py-3 text-sm text-gray-500 dark:text-gray-400"
    >
      <ol className="flex flex-wrap items-center justify-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1">
              {isLast ? (
                <span className="font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-indigo-500 transition-colors"
                >
                  {item.label}
                </Link>
              )}

              {!isLast && <ChevronRight size={16} className="text-gray-400" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
