import React from "react";

const SectionTitle = ({
  title,
  decoratedText,
  description,
  icon,
  dataLength,
  badgeSize = { lg: 14, sm: 10 },
  dataName = "",
}) => {
  const badgeClasses = `
    rounded-full bg-indigo-600 border-2 border-amber-500
    font-bold text-white flex items-center justify-center shadow-sm w-4 h-4 rounded-full bg-indigo-600 border-2 border-base-100 lg:text-xs text-xs text-white flex items-center justify-center shadow-sm p-2.5
  `;
  return (
    <div className="lg:space-y-1 space-y-1 text-center dark:bg-slate-900/25 dark:bg-gray-800s shadow-sm w-full lg:py-2 py-2 rounded-t-md border-b border-base-content/15 dark:border-gray-700 font-extrabold lg:mb-6 mb-3">
      <div className="flex justify-center">
        <h1 className="lg:text-2xl text-sm font-extrabold flex items-center space-x-2 uppercase">
          {icon && (
            <span className="">
              {React.cloneElement(icon, {
                className: "w-4 h-4 lg:w-6 lg:h-6",
              })}
            </span>
          )}{" "}
          <span>{title}</span>{" "}
          {(decoratedText || dataName) && (
            <span className="text-amber-600">{decoratedText}</span>
          )}
          {dataLength && (
            <span className="flex items-center gap-2">
              <span
                className={`lg:text-xs text-xs font-bold bg-slate-800 dark:bg-slate-700 dark:text-slate-400 dark:border-slate-500 ${badgeClasses} lg:w-[${badgeSize.lg}px] lg:h-[${badgeSize.lg}px] w-[${badgeSize.sm}px]  h-[${badgeSize.sm}px]`}
              >
                {dataLength ? dataLength : 0}
              </span>
              <span>{dataName ? dataName : ""}</span>
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
