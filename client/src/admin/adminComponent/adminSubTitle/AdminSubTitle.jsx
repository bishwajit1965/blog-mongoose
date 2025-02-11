import { Link } from "react-router-dom";

const AdminSubTitle = ({
  link,
  navigationButton,
  dataLength,
  subTitle,
  decoratedText,
}) => {
  return (
    <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 justify-between items-center bg-base-200 dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="lg:col-span-4 col-span-12 pl-2">
        {link && (
          <Link to={`${link}`} className="m-0 p-o">
            {navigationButton}
          </Link>
        )}
      </div>
      <div className="lg:col-span-4 col-span-12 text-center">
        <h2 className="text-xl font-bold space-x-2">
          {subTitle && <span className="text-xl font-bold">{subTitle}</span>}
          {decoratedText && (
            <span className="text-xl font-bold text-amber-700 dark:text-amber-400">
              {decoratedText}
            </span>
          )}
        </h2>
      </div>
      <div className="lg:col-span-4 col-span-12 flex justify-end pr-2">
        {dataLength ? (
          <>
            <h2 className="text-xl font-bold">
              Total Data:{" "}
              {dataLength && (
                <span className="text-amber-700 dark:text-amber-400">
                  {dataLength}
                </span>
              )}
            </h2>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AdminSubTitle;
