import { FaArrowAltCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LucideIcon } from "../lucideIcon/LucideIcons";

const CustomPageTitle = ({
  title,
  decoratedText,
  subtitle,
  dataLength,
  about,
  slogan,
  navigationLink,
  navigationArea,
  icon,
  updatedAt,
}) => {
  return (
    <div className="max-w-6xl mx-auto lg:px-4 px-4 lg:py-4 py-2">
      <header className="lg:mb-12 mb-4 border-b-2 border-base-content/15 dark:border-gray-600 lg:pb-6 pb-3">
        <h1 className="lg:text-4xl text-lg md:text-5xl font-bold dark:text-gray-400 flex items-center">
          {icon} {title}
          <span className="text-amber-800 dark:text-amber-500">
            {decoratedText}
          </span>
          {dataLength ? (
            <span className="flex items-center gap-2">
              &nbsp;{" "}
              <span className="w-6 h-6 text-sm bg-gray-800 dark:bg-gray-600 text-base-100 rounded-full flex items-center justify-center">
                {dataLength}
              </span>{" "}
              <span className="text-blue-500 dark:text-emerald-400">
                {about}
              </span>
            </span>
          ) : (
            ""
          )}
        </h1>

        {updatedAt ? (
          <p className="flex items-center gap-2 lg:mt-3 mt-2 text-sm text-base-content/60 dark:text-gray-400">
            <LucideIcon.CalendarDays size={14} /> Last updated:{" "}
            {new Date(updatedAt).toLocaleDateString()}
          </p>
        ) : (
          <p className="flex items-center gap-2">
            <LucideIcon.CalendarDays size={14} /> Last updated -- N/A
          </p>
        )}

        {subtitle && (
          <h2 className="lg:text-xl text-xs font-serif max-w-6xl mx-auto hidden lg:block">
            {subtitle}
          </h2>
        )}

        {slogan && (
          <p className="lg:pb-1 text-md font-serif max-w-3xl mx-auto hidden lg:block">
            {slogan}
          </p>
        )}

        {navigationLink && navigationArea && (
          <div className="flex justify-center space-x-4">
            <Link
              to={`/${navigationLink}`}
              className="font-bold text-md flex items-center dark:link-warning hover:link"
            >
              <FaArrowAltCircleLeft className="mr-2" /> Go to {navigationArea}{" "}
              <FaArrowCircleRight className="ml-2" />
            </Link>
          </div>
        )}
      </header>
    </div>
  );
};

export default CustomPageTitle;
