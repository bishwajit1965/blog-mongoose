const AdminPagination = ({ currentPage, totalPages, onPageChange }) => {
  const generatePageNumbers = () => {
    const pages = [];
    const delta = 2; // Number of pages to show around the current page

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Always show the first page
        i === totalPages || // Always show the last page
        (i >= currentPage - delta && i <= currentPage + delta) // Pages near the current page
      ) {
        pages.push(i);
      } else if (
        pages[pages.length - 1] !== "..." // Avoid consecutive ellipsis
      ) {
        pages.push("...");
      }
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-3 py-1 rounded ${
          currentPage === 1
            ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
            : "bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 hover:text-white"
        }`}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-1">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages
            ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
            : "bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 hover:text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default AdminPagination;
