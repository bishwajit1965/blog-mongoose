const SectionTitle = ({ title, description, icon, dataLength }) => {
  return (
    <div className="lg:space-y-1 space-y-1 text-center bg-gray-200 shadow-md w-full lg:py-2 py-2 rounded-md">
      <div className="flex justify-center">
        <h1 className="lg:text-2xl font-extrabold flex items-center space-x-2">
          <span>{icon}</span> <span>{title}</span> <span>{dataLength}</span>
        </h1>
      </div>
      <div className="">
        <p className="">{description}</p>
      </div>
    </div>
  );
};

export default SectionTitle;
