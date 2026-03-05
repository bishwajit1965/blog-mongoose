import { FaArrowAltCircleRight, FaListAlt } from "react-icons/fa";
import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import SectionTitle from "../sectionTitle/SectionTitle";

const Categories = ({
  data,
  isLoading,
  error,
  user,
  onCategorySelect,
  selectedCategory,
}) => {
  if (isLoading) return <AdminLoader />;
  if (error) return <div>Error!</div>;
  if (!data || data.length === 0) return <div>No categories found</div>;
  user && console.log(user);

  return (
    <div>
      <SectionTitle
        title="Blog"
        decoratedText="Categories"
        dataLength={
          data?.length > 0 ? (
            data?.length
          ) : (
            <span className="text-red-500">{0}</span>
          )
        }
        icon={<FaListAlt />}
      />
      {data.map((category) => {
        const isActive = selectedCategory === category.name;
        return (
          <div
            key={category._id}
            onClick={() => onCategorySelect(category.name)}
            className={`flex items-center justify-between bg-base-200 text-base-200 p-2 my-2.5 rounded-md shadow-md cursor-pointer hover:bg-gray-300 hover:text-base-contents dark:bg-gray-800 dark:text-base-300 dark:hover:bg-gray-700 dark:hover:text-base-100 ${isActive ? "dark:bg-teal-500 hover:bg-teal-600 hover:text-base-100 hover:dark:bg-teal-600 bg-teal-500" : "bg-base-200 text-gray-700 hover:bg-base-300"}`}
          >
            <div className="lg:inline-flex flex-wrap items-center justify-between grid gap-2">
              <h2 className="text-lg text-md font-bold uppercase flex items-center gap-2">
                <FaArrowAltCircleRight size={15} /> {category.name}
              </h2>
              <p className="lg:text-md text-sm">{category.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
