import { useMemo } from "react";

/**
 * Custom hook to process data with optional filtering and search functionality.
 *
 * @param {Array} data - The full list of data items.
 * @param {string} filter - The filter condition (e.g., 'all', 'approved', 'pending', etc.).
 * @param {string} query - The search query to filter titles by.
 * @returns {Array} - The filtered and processed data based on the given filter and search query.
 */
const useProcessedDataToSearchAndFilter = (
  data,
  filter = "all",
  query = ""
) => {
  return useMemo(() => {
    if (!data) return [];

    let result = data;

    // Apply filter condition if the filter is not 'all'
    if (filter !== "all") {
      result = result.filter((item) => item.reviewStatus === filter);
    }

    // Apply search query to filter titles
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((item) => item.title.toLowerCase().includes(q));
    }

    return result;
  }, [data, filter, query]); // Dependencies: data, filter, query
};

export default useProcessedDataToSearchAndFilter;

// Use cases
// import useProcessedData from "./useProcessedData"; // Import the hook

// const AdminTable = ({ data, filter, searchQuery }) => {
//   const processedData = useProcessedData(data, filter, searchQuery);

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Review Status</th>
//             {/* Other headers */}
//           </tr>
//         </thead>
//         <tbody>
//           {processedData.map((item) => (
//             <tr key={item.id}>
//               <td>{item.title}</td>
//               <td>{item.reviewStatus}</td>
//               {/* Other data */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
