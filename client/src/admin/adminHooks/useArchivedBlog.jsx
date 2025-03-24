import AdminArchivedBlogContext from "../adminContexts/AdminArchivedBlogContext";
import { useContext } from "react";

const useArchivedBlog = () => {
  const context = useContext(AdminArchivedBlogContext);
  if (context === undefined) {
    throw new Error(
      "useArchivedBlog must be used within an ArchivedBlogProvider"
    );
  }
  return context;
};

export default useArchivedBlog;
