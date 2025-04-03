import { useCallback, useEffect, useState } from "react";

import AdminFlaggedPostContext from "../adminContexts/AdminFlaggedPostContext";
import { getFlaggedPosts } from "../adminServices/flaggedBlogService";

const AdminFlaggedPostContextProvider = ({ children }) => {
  const [flaggedPosts, setFlaggedPosts] = useState([]);
  console.log("Flagged posts=>", flaggedPosts);
  const [loading, setLoading] = useState(false);

  const fetchFlaggedBlogPosts = useCallback(async () => {
    try {
      setLoading(true);
      const [flaggedPostResponse] = await Promise.all([getFlaggedPosts()]);
      setFlaggedPosts(flaggedPostResponse);
    } catch (err) {
      console.error("Error fetching flagged posts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFlaggedBlogPosts();
  }, [fetchFlaggedBlogPosts]);

  const flaggedPostInfo = { flaggedPosts, loading, fetchFlaggedBlogPosts };

  return (
    <AdminFlaggedPostContext.Provider value={flaggedPostInfo}>
      {children}
    </AdminFlaggedPostContext.Provider>
  );
};

export default AdminFlaggedPostContextProvider;
