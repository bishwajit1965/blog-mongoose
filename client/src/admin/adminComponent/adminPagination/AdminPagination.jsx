import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useEffect, useState } from "react";

const AdminPagination = ({
  items, // Pass the full list of items here
  itemsPerPageOptions = [5, 10, 15, 20, 25, 30, 50, 70, 100],
  onPaginatedDataChange, // Callback to send the paginated data to the parent
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const generatePageNumbers = () => {
    const delta = 2;
    const range = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    return range;
  };

  const handlePageChange = (page) => {
    if (page !== "..." && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, items.length);
    const paginatedData = items.slice(startIndex, endIndex);

    onPaginatedDataChange(paginatedData); // Send paginated data to parent
  }, [currentPage, itemsPerPage, items, onPaginatedDataChange]);

  const pages = generatePageNumbers();

  return (
    <div className="flex flex-col items-center space-y-2 mt-3">
      <div className="flex items-center space-x-2 dark:bg-gray-900 border dark:border-gray-700 rounded shadow-sm">
        <label htmlFor="itemsPerPage" className="text-sm pl-2">
          Items per page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="py-[2px] justify-end px-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        >
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-2 py-[2px] rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed dark:bg-gray-600"
              : "bg-gray-200 hover:bg-blue-500 hover:text-white dark:bg-gray-700"
          }`}
        >
          <FaAngleLeft className="inline" /> Prev
        </button>

        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-[2px] rounded ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-blue-500 hover:text-white dark:bg-gray-700"
            }`}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-2 py-[2px] rounded ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed dark:bg-gray-600"
              : "bg-gray-200 hover:bg-blue-500 hover:text-white dark:bg-gray-700"
          }`}
        >
          Next <FaAngleRight className="inline" />
        </button>
      </div>

      <div className="text-xs dark:text-gray-300">
        Showing page {currentPage} of {totalPages} ({itemsPerPage} items per
        page)
      </div>
    </div>
  );
};

export default AdminPagination;
