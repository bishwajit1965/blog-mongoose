import AdminFlaggedPostContext from "../adminProviders/data/AdminFlaggedPostContext";
import { useContext } from "react";

const useFlaggedPosts = () => {
  const context = useContext(AdminFlaggedPostContext);
  if (context === undefined) {
    throw new Error(
      "useFlaggedPosts must be used within an AdminFlaggedPostProvider",
    );
  }
  return context;
};

export default useFlaggedPosts;
