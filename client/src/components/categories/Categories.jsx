import { FaFolderOpen, FaListAlt } from "react-icons/fa";
import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import SectionTitle from "../sectionTitle/SectionTitle";

const Categories = ({
  data = [],
  isLoading,
  error,
  onCategorySelect,
  selectedCategory,
}) => {
  if (isLoading) return <AdminLoader />;

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        Failed to load categories.
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-sm text-gray-500 dark:text-gray-400">
        No categories found.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <SectionTitle
        title="Blog"
        decoratedText="Categories"
        dataLength={data?.length}
        icon={<FaListAlt />}
      />

      <div className="space-y-2">
        {data.map((category) => {
          const isActive = selectedCategory === category.name;

          return (
            <button
              key={category._id}
              type="button"
              onClick={() => onCategorySelect(category.name)}
              className={`
                w-full
                text-left
                rounded-lg
                border
                p-2
                transition-all
                duration-200

                ${
                  isActive
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                }
              `}
            >
              <div className="flex items-start gap-3">
                <FaFolderOpen
                  className={`mt-1 ${
                    isActive ? "text-white" : "text-blue-600 dark:text-blue-400"
                  }`}
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-base">{category.name}</h3>

                  {category.description && (
                    <p
                      className={`mt-1 text-sm ${
                        isActive
                          ? "text-blue-100"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {category.description}
                    </p>
                  )}
                </div>

                {category.postCount > 0 && (
                  <span
                    className={`
                      rounded-full
                      px-2.5
                      py-1
                      text-xs
                      font-semibold

                      ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      }
                    `}
                  >
                    {category.postCount}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;

// import { FaArrowAltCircleRight, FaListAlt } from "react-icons/fa";
// import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
// import SectionTitle from "../sectionTitle/SectionTitle";

// const Categories = ({
//   data,
//   isLoading,
//   error,
//   user,
//   onCategorySelect,
//   selectedCategory,
// }) => {
//   if (isLoading) return <AdminLoader />;
//   if (error) return <div>Error!</div>;
//   if (!data || data.length === 0) return <div>No categories found</div>;
//   user && console.log(user);

//   return (
//     <div>
//       <SectionTitle
//         title="Blog"
//         decoratedText="Categories"
//         dataLength={
//           data?.length > 0 ? (
//             data?.length
//           ) : (
//             <span className="text-red-500">{0}</span>
//           )
//         }
//         icon={<FaListAlt />}
//       />
//       {data.map((category) => {
//         const isActive = selectedCategory === category.name;
//         return (
//           <div
//             key={category._id}
//             onClick={() => onCategorySelect(category.name)}
//             className={`flex items-center justify-between bg-base-200 text-base-200 p-2 my-2.5 rounded-md shadow-md cursor-pointer hover:bg-gray-300 hover:text-base-contents dark:bg-gray-800 dark:text-base-300 dark:hover:bg-gray-700 dark:hover:text-base-100 ${isActive ? "dark:bg-teal-500 hover:bg-teal-600 hover:text-base-100 hover:dark:bg-teal-600 bg-teal-500" : "bg-base-200 text-gray-700 hover:bg-base-300"}`}
//           >
//             <div className="lg:inline-flex flex-wrap items-center justify-between grid gap-2">
//               <h2 className="text-lg text-md font-bold uppercase flex items-center gap-2">
//                 <FaArrowAltCircleRight size={15} /> {category.name}
//               </h2>
//               <p className="lg:text-md text-sm">{category.description}</p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Categories;
