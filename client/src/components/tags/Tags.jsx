import { FaTags } from "react-icons/fa";
import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import SectionTitle from "../sectionTitle/SectionTitle";

const Tags = ({ data = [], isLoading, error, onTagSelect, selectedTag }) => {
  if (isLoading) return <AdminLoader />;
  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        Failed to load tags.
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-sm text-gray-500 dark:text-gray-400">
        No tags found.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <SectionTitle
        title="Blog"
        decoratedText="Tags"
        dataLength={data.length}
        icon={<FaTags />}
      />

      <div className="flex flex-wrap gap-2">
        {data.map((tag) => {
          const isActive = selectedTag === tag.name;

          return (
            <button
              key={tag._id}
              type="button"
              onClick={() => onTagSelect(tag.name)}
              className={`
                group
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                px-2
                py-1
                text-sm
                font-medium
                transition-all
                duration-200
                cursor-pointer

                ${
                  isActive
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-blue-500"
                }
              `}
            >
              <span>{tag.name}</span>

              {tag.postCount > 0 && (
                <span
                  className={`
                    rounded-full
                    px-2
                    py-0.5
                    text-xs
                    font-semibold
                    ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    }
                  `}
                >
                  {tag.postCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tags;

// import { FaArrowAltCircleRight, FaTags } from "react-icons/fa";
// import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
// import SectionTitle from "../sectionTitle/SectionTitle";

// const Tags = ({ data, isLoading, error, onTagSelect, selectedTag }) => {
//   if (isLoading) return <AdminLoader />;
//   if (error) return <div>Error!</div>;
//   if (!data || data.length === 0) return <div>No tags found</div>;
//   console.log("Tags data:", data);
//   return (
//     <div>
//       <SectionTitle
//         title="Blog"
//         decoratedText="Tags"
//         dataLength={
//           data?.length > 0 ? (
//             data?.length
//           ) : (
//             <span className="text-red-500">{0}</span>
//           )
//         }
//         icon={<FaTags />}
//       />
//       <div className="flex flex-wrap gap-2.5 py-2">
//         {data.map((tag) => {
//           const isActive = selectedTag === tag.name;

//           return (
//             <div
//               key={tag._id}
//               onClick={() => onTagSelect(tag.name)}
//               className={`bg-base-200 text-base-200 rounded-full shadow-md cursor-pointer hover:bg-gray-300 hover:text-base-contents dark:bg-gray-800 dark:text-base-300 dark:hover:bg-gray-700 dark:hover:text-base-100 ${isActive ? "dark:bg-teal-500 text-base-100 rounded-full hover:bg-teal-600 hover:text-base-100 hover:dark:bg-teal-600 bg-teal-500" : "bg-base-200 text-gray-700 hover:bg-base-300"}`}
//             >
//               <span
//                 className={`lg:text-sm text-sm font-semibold capitalize flex items-center gap-1 px-2.5 py-1 border rounded-full dark:border-gray-700   ${isActive ? "dark:text-base-100 text-base-100" : "text-gray-500"}`}
//               >
//                 <FaArrowAltCircleRight size={15} />
//                 {tag.name}
//               </span>
//               {/* <p className="lg:text-md text-sm">{tag.slug}</p> */}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Tags;
