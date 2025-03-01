import { useCallback, useEffect, useState } from "react";

import AdminBlogContext from "../adminContexts/AdminBlogContext";
import { getAllBlogs } from "../adminServices/blogService";
import { getAllCategories } from "../adminServices/categoryService";
import { getAllTags } from "../adminServices/tagService";

const AdminBlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogsCategoriesAndTags = useCallback(async () => {
    try {
      setLoading(true);
      const [blogsResponse, categoriesResponse, tagsResponse] =
        await Promise.all([getAllBlogs(), getAllCategories(), getAllTags()]);
      setBlogs(blogsResponse);
      setCategories(categoriesResponse);
      setTags(tagsResponse);
    } catch (err) {
      console.error("Error fetching categories:", +err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogsCategoriesAndTags();
  }, [fetchBlogsCategoriesAndTags]);

  const blogInfo = {
    fetchBlogsCategoriesAndTags,
    blogs,
    categories,
    tags,
    loading,
  };

  return (
    <AdminBlogContext.Provider value={blogInfo}>
      {children}
    </AdminBlogContext.Provider>
  );
};

export default AdminBlogProvider;
