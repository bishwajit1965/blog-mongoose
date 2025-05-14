import api from "../helperApiService/helperApiService";
import { useQuery } from "@tanstack/react-query";

const fetchBookmarkedPosts = async () => {
  const response = await api.get("/bookmark-post/get-bookmarks");
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
