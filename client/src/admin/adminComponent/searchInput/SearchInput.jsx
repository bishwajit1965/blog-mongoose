import { useEffect, useState } from "react";

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
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
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

  return (
    <div className="mb-4 shadow-sm">
      <input
        type="text"
        className="input input-sm input-bordered w-full dark:bg-gray-700"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search blog post by title..."
      />
    </div>
  );
};

export default SearchInput;
