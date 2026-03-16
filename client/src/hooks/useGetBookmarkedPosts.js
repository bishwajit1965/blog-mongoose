import { getAuth } from "firebase/auth";
import api from "../publicHelperApis/helperApiService";
import { useQuery } from "@tanstack/react-query";

const fetchBookmarkedPosts = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const token = await user.getIdToken();
  const response = await api.get("/bookmark-post/get-bookmarks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
};

const useGetBookmarkedPosts = () => {
  return useQuery({
    queryKey: ["bookmarked-posts"],
    queryFn: fetchBookmarkedPosts,
    staleTime: 1000 * 60,
  });
};

export default useGetBookmarkedPosts;
