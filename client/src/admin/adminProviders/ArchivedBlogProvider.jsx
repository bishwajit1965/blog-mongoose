import { useCallback, useEffect, useState } from "react";

import AdminArchivedBlogContext from "../adminContexts/AdminArchivedBlogContext";
import { getAllBlogs } from "../adminServices/blogService";
import { getArchivedBlogs } from "../adminServices/archivedBlogService";

const ArchivedBlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [archivedBlogs, setArchivedBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("Blogs all:", blogs);
  console.log("Archived blogs:", archivedBlogs);

  const fetchArchivedBlogPostsCategoriesAndTags = useCallback(async () => {
    try {
      setLoading(true);
      const [blogResponse, archivedBlogsResponse] = await Promise.all([
        getAllBlogs(),
        getArchivedBlogs(),
      ]);
      setBlogs(blogResponse || []);
      setArchivedBlogs(archivedBlogsResponse || []);
    } catch (err) {
      console.error("Error fetching blogs, tags or categories:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArchivedBlogPostsCategoriesAndTags();
  }, [fetchArchivedBlogPostsCategoriesAndTags]);

  const archivedBlogInfo = {
    fetchArchivedBlogPostsCategoriesAndTags,
    blogs,
    archivedBlogs,
    loading,
  };

  return (
    <AdminArchivedBlogContext.Provider value={archivedBlogInfo}>
      {children}
    </AdminArchivedBlogContext.Provider>
  );
};

export default ArchivedBlogProvider;
