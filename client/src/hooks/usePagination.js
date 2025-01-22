import { useState } from "react";

const usePagination = (items, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return { currentItems, currentPage, setCurrentPage };
};

export default usePagination;
