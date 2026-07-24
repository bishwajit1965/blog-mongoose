import { useState } from "react";
import AdminPageContext from "../data/AdminPageContext";
import { useCallback } from "react";
import {
  getAllPages,
  getSoftDeletedPages,
} from "../../adminServices/AdminPageService";
import { useEffect } from "react";

const AdminPageProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [softDeletedPages, setSoftDeletedPages] = useState([]);

  console.log("Pages", pages);

  const fetchPages = useCallback(async () => {
    try {
      setLoading(true);
      const [pageResponse, softDeletedPageResponse] = await Promise.all([
        getAllPages(),
        getSoftDeletedPages(),
      ]);
      setPages(pageResponse?.pages);
      setSoftDeletedPages(softDeletedPageResponse?.pages);
    } catch (error) {
      console.error("Error in fetching pages.", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  // Real time data update on upload
  const addPageToState = async (page) => {
    await setPages((prev) => [...prev, page]);
  };

  // Real time data update on update
  const updatePageToState = async (updatedPage) => {
    await setPages((prev) =>
      prev?.map((prevPage) =>
        prevPage?._id === updatedPage?._id ? updatedPage : prevPage,
      ),
    );
  };

  // Real time data update on page restore
  const restorePageToState = (page) => {
    setPages((prev) => [...prev, page]);
  };

  // Real time data update on page delete
  const removePageFromState = (id) => {
    setPages((prev) => prev.filter((page) => page._id !== id));
  };

  const pageInfo = {
    loading,
    pages,
    softDeletedPages,
    fetchPages,
    addPageToState,
    updatePageToState,
    restorePageToState,
    removePageFromState,
  };

  return (
    <AdminPageContext.Provider value={pageInfo}>
      {children}
    </AdminPageContext.Provider>
  );
};

export default AdminPageProvider;
