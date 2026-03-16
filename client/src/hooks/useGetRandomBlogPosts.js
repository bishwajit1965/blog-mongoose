import api from "../publicHelperApis/helperApiService";
import { useQuery } from "@tanstack/react-query";

const fetchRandomBlogs = async () => {
  const response = await api.get("/blogs/random");
  return response.data;
};

const useGetRandomBlogPosts = () => {
  return useQuery({
    queryKey: ["random-blogs"],
    queryFn: fetchRandomBlogs,
    staleTime: 1000 * 60, // 1 minute cache
  });
};

export default useGetRandomBlogPosts;
