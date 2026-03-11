import { FaArrowAltCircleRight, FaTags } from "react-icons/fa";
import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import SectionTitle from "../sectionTitle/SectionTitle";

const Tags = ({ data, isLoading, error, onTagSelect, selectedTag }) => {
  if (isLoading) return <AdminLoader />;
  if (error) return <div>Error!</div>;
  if (!data || data.length === 0) return <div>No tags found</div>;
  console.log("Tags data:", data);
  return (
    <div>
      <SectionTitle
        title="Blog"
        decoratedText="Tags"
        dataLength={
          data?.length > 0 ? (
            data?.length
          ) : (
            <span className="text-red-500">{0}</span>
          )
        }
        icon={<FaTags />}
      />
      <div className="flex flex-wrap gap-2.5 py-2">
        {data.map((tag) => {
          const isActive = selectedTag === tag.name;

          return (
            <div
              key={tag._id}
              onClick={() => onTagSelect(tag.name)}
              className={`bg-base-200 text-base-200 rounded-full shadow-md cursor-pointer hover:bg-gray-300 hover:text-base-contents dark:bg-gray-800 dark:text-base-300 dark:hover:bg-gray-700 dark:hover:text-base-100 ${isActive ? "dark:bg-teal-500 text-base-100 rounded-full hover:bg-teal-600 hover:text-base-100 hover:dark:bg-teal-600 bg-teal-500" : "bg-base-200 text-gray-700 hover:bg-base-300"}`}
            >
              <span
                className={`lg:text-sm text-sm font-semibold capitalize flex items-center gap-1 px-2.5 py-1 border rounded-full dark:border-gray-700   ${isActive ? "dark:text-base-100 text-base-100" : "text-gray-500"}`}
              >
                <FaArrowAltCircleRight size={15} />
                {tag.name}
              </span>
              {/* <p className="lg:text-md text-sm">{tag.slug}</p> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tags;
