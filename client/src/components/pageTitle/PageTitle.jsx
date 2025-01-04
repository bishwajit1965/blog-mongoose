import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const PageTitle = ({
  title,
  decoratedText,
  slogan,
  navigationLink,
  navigationArea,
}) => {
  return (
    <div className="lg:p-6 p-2 text-center shadow-md border-b border-slate-300 bg-base-300 pb-2 lg:space-y-2">
      <h2 className="lg:text-2xl text-1xl font-bold dark:text-emerald-400 rounded-b-md">
        {title} <span className="text-orange-700">{decoratedText}</span>
      </h2>
      {slogan && (
        <p className="lg:pb-1 text-md font-serif max-w-3xl mx-auto hidden lg:block dark:text-emerald-400">
          {slogan}
        </p>
      )}
      <div className="">
        {navigationLink && navigationArea && (
          <div className="flex justify-center space-x-4">
            <Link
              to={`/${navigationLink}`}
              className="hover:link link-primary font-bold text-md flex items-center"
            >
              {navigationArea} <FaArrowCircleRight className="ml-1" />
            </Link>
          </div>
        )}
      </div>
      <div className="w-28 h-1 shadow-md mx-auto bg-orange-900 dark:bg-emerald-400 hidden lg:block rounded-md"></div>
    </div>
  );
};

export default PageTitle;
