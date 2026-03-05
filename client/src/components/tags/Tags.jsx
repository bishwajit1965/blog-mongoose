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
      {data.map((tag) => {
        const isActive = selectedTag === tag.name;

        return (
          <div
            key={tag._id}
            onClick={() => onTagSelect(tag.name)}
            className={`flex items-center justify-between bg-base-200 text-base-200 p-2 my-2.5 rounded-md shadow-md cursor-pointer hover:bg-gray-300 hover:text-base-contents dark:bg-gray-800 dark:text-base-300 dark:hover:bg-gray-700 dark:hover:text-base-100 ${isActive ? "dark:bg-teal-500 hover:bg-teal-600 hover:text-base-100 hover:dark:bg-teal-600 bg-teal-500" : "bg-base-200 text-gray-700 hover:bg-base-300"}`}
          >
            <div className="lg:inline-flex items-center grid gap-2 flex-wrap">
              <h2 className="lg:text-lg text-md font-bold uppercase flex items-center gap-2">
                {" "}
                <FaArrowAltCircleRight size={15} />
                {tag.name}
              </h2>
              <p className="lg:text-md text-sm">{tag.slug}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tags;
