import { FaArrowAltCircleLeft, FaArrowCircleRight } from "react-icons/fa";

import { Link } from "react-router-dom";

const PageTitle = ({
  title,
  decoratedText,
  subtitle,
  dataLength,
  about,
  slogan,
  navigationLink,
  navigationArea,
  icon,
}) => {
  return (
    <div className="text-center lg:mb-6 mb-3 lg:space-y-2 space-y-1">
      <h1 className="lg:text-3xl text-sm font-serif font-bold rounded-b-md flex items-center justify-center gap-1.5">
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
            <span className="text-blue-500 dark:text-emerald-400">{about}</span>
          </span>
        ) : (
          ""
        )}
      </h1>

      {subtitle && (
        <h2 className="lg:text-xl text-xs font-serif max-w-5xl mx-auto hidden lg:block">
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

      <div className="w-28 h-1 bg-amber-800 dark:bg-emerald-600 shadow-md mx-auto hidden lg:block rounded-md"></div>
    </div>
  );
};

export default PageTitle;
