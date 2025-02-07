import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useEffect, useState } from "react";

const AdminPagination = ({
  totalItems,
  itemsPerPageOptions = [5, 10, 15, 20, 25, 30, 50],
  onRangeChange, // Sends range (startIndex, endIndex) to the parent
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate page numbers with ellipses
  const generatePageNumbers = () => {
    const delta = 2;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Always show the first page
        i === totalPages || // Always show the last page
        (i >= currentPage - delta && i <= currentPage + delta) // Show pages near current
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  const handlePageChange = (page) => {
    if (page !== "..." && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    onRangeChange({ startIndex, endIndex }); // Send range to parent
  }, [currentPage, itemsPerPage, onRangeChange]);

  const pages = generatePageNumbers();

  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Items Per Page Selector */}
      <div className="mt-3 dark:bg-gray-900 border dark:border-gray-700 rounded">
        <label htmlFor="itemsPerPage" className="mr-2 ml-2">
          Items per page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="py-[2px] border rounded dark:bg-gray-700 dark:border-gray-700"
        >
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option} className="flex justify-end">
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Controls */}
      <div className="flex space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-1 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed dark:bg-gray-600"
              : "bg-gray-200 hover:bg-blue-500 hover:text-white dark:bg-gray-700"
          }`}
        >
          <span className="flex items-center">
            <FaAngleLeft className="flex justify-start" /> Prev
          </span>
        </button>

        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`px-[10px] py-[2px] rounded ${
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
          className={`px-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed dark:bg-gray-600"
              : "bg-gray-200 hover:bg-blue-500 hover:text-white dark:bg-gray-700"
          }`}
        >
          <span className="flex items-center">
            Next <FaAngleRight />
          </span>
        </button>
      </div>
    </div>
  );
};

export default AdminPagination;
