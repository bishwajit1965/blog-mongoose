import React from "react";

const SectionTitle = ({
  title,
  decoratedText,
  description,
  icon,
  dataLength,
  badgeSize = { lg: 16, sm: 12 },
}) => {
  const badgeClasses = `
    rounded-full bg-indigo-600 border-2 border-amber-500
    font-bold text-white flex items-center justify-center shadow-sm w-6 h-6 rounded-full bg-indigo-600 border-2 border-base-100 lg:text-xs text-xs text-white flex items-center justify-center shadow-sm p-3.5
  `;
  return (
    <div className="lg:space-y-1 space-y-1 text-center bg-base-300 dark:bg-gray-800 shadow-sm w-full lg:py-2 py-2 rounded-t-md border border-1 border-gray-100 dark:border-gray-700">
      <div className="flex justify-center">
        <h1 className="lg:text-2xl text-lg font-extrabold flex items-center space-x-2">
          {icon && (
            <span className="">
              {React.cloneElement(icon, {
                className: "w-5 h-5 lg:w-6 lg:h-6",
              })}
            </span>
          )}{" "}
          <span>{title}</span>{" "}
          {decoratedText && (
            <span className="text-amber-600">{decoratedText}</span>
          )}
          {dataLength && (
            <span
              className={`lg:text-xs text-xs font-bold bg-emerald-500 dark:bg-slate-600 dark:text-base-100 ${badgeClasses} lg:w-[${badgeSize.lg}px] lg:h-[${badgeSize.lg}px] w-[${badgeSize.sm}px]  h-[${badgeSize.sm}px]`}
            >
              {dataLength}
            </span>
          )}
        </h1>
      </div>
      <div className="">
        <p className="">{description}</p>
      </div>
    </div>
  );
};

export default SectionTitle;
