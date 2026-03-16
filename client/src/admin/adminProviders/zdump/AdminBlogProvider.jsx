import { useCallback, useEffect, useState } from "react";

import AdminBlogContext from "../adminContexts/AdminBlogContext";
import {
  getAllBlogs,
  getBlogsForSuperAdminDashBoard,
} from "../../adminServices/blogService";
import { getAllCategories } from "../../adminServices/categoryService";
import { getAllTags } from "../../adminServices/tagService";

const AdminBlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [superAdminBlogsAll, setSuperAdminBlogsAll] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("CRUD BLOGS", superAdminBlogsAll);

  const fetchBlogsCategoriesAndTags = useCallback(async () => {
    try {
      setLoading(true);
      const [blogsResponse, categoriesResponse, tagsResponse] =
        await Promise.all([getAllBlogs(), getAllCategories(), getAllTags()]);
      setBlogs(blogsResponse);
      setCategories(categoriesResponse);
      setTags(tagsResponse);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // For Crud Operations in ManageBlogPosts.jsx
  const fetchBlogsForCrudInSuperAdminBlogManagement = useCallback(async () => {
    try {
      setLoading(true);
      const [superAdminBlogResponseAll] = await Promise.all([
        getBlogsForSuperAdminDashBoard(),
      ]);
      setSuperAdminBlogsAll(superAdminBlogResponseAll);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogsCategoriesAndTags();
  }, [fetchBlogsCategoriesAndTags]);

  useEffect(() => {
    fetchBlogsForCrudInSuperAdminBlogManagement();
  }, [fetchBlogsForCrudInSuperAdminBlogManagement]);

  const blogInfo = {
    blogs,
    superAdminBlogsAll,
    categories,
    tags,
    loading,
    fetchBlogsCategoriesAndTags,
    fetchBlogsForCrudInSuperAdminBlogManagement,
  };

  return (
    <AdminBlogContext.Provider value={blogInfo}>
      {children}
    </AdminBlogContext.Provider>
  );
};

export default AdminBlogProvider;
