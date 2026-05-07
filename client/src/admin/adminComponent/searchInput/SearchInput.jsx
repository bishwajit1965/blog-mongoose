import { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";

const SearchInput = ({ data, onFilteredDataChange, pageLimit = 5 }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]); // Holds search results

  // Sync with original data when `data` updates (e.g., API response)
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // Handle search filtering
  useEffect(() => {
    if (searchQuery) {
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data]);

  // Send filtered data back to parent
  useEffect(() => {
    onFilteredDataChange(filteredData.slice(0, pageLimit)); // Handle pagination inside SearchInput
  }, [filteredData, onFilteredDataChange, pageLimit]);

  const handleRemoveSearchText = () => {
    setSearchQuery("");
  };

  return (
    <div className="mb-4 shadow-sm flex items-center gap-2">
      <input
        type="text"
        className="input input-sm input-bordered w-full dark:bg-gray-800 dark:border-gray-700"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search blog post by title..."
      />

      <button
        onClick={handleRemoveSearchText}
        className="flex items-center gap-2 bg-success dark:bg-gray-700 dark:text-gray-400 px-2 py-1 rounded-md text-base-100 shadow"
      >
        <RefreshCcw size={20} />
        Reset
      </button>
    </div>
  );
};

export default SearchInput;
