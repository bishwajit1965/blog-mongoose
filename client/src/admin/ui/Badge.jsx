const Badge = ({ color = "blue", children }) => {
  const colors = {
    blue: "bg-blue-200 text-blue-800 dark:bg-gray-700 dark:text-gray-400",
    green: "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200",
    gray: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-400",
    red: "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200",
  };

  return (
    <span
      className={`px-2 py-[1px] flex items-center justify-center shadow-sm rounded-full capitalize text-xs w-fit font-medium border border-base-content/15 dark:border-gray-700 ${colors[color]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
