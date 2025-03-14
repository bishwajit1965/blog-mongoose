const AdminCardTitle = ({ dataLength, subTitle, decoratedText }) => {
  return (
    <div className="lg:grid lg:grid-cols-12 flex items-center justify-between gap-2 bg-base-300 dark:bg-gray-700 shadow-sm p-2">
      <div className="lg:col-span-8 col-span-6">
        <h2 className="text-sm font-bold space-x-2">
          {subTitle && <span className="text-xl font-bold">{subTitle}</span>}
          {decoratedText && (
            <span className="text-xl font-bold text-amber-700 dark:text-amber-400">
              {decoratedText}
            </span>
          )}
        </h2>
      </div>
      <div className="lg:col-span-4 col-span-6 flex justify-end">
        {dataLength ? (
          <>
            <h2 className="text-xl font-bold">
              Total data:{" "}
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

export default AdminCardTitle;
