import AdminBlogContext from "../adminProviders/data/AdminBlogContext";
import { useContext } from "react";

const useAdminBlog = () => {
  const context = useContext(AdminBlogContext);
  if (context === undefined) {
    throw new Error("useAdminBlog must be used within an AdminBlogProvider");
  }
  return context;
};

export default useAdminBlog;
