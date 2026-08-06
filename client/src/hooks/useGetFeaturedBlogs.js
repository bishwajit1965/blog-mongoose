import { useQuery } from "@tanstack/react-query";

import api from "../publicHelperApis/helperApiService";

const fetchFeaturedBlogs = async () => {
  const response = await api.get("/blogs/featured");
  return response.data.featuredPosts || response.data || [];
};

const useGetFeaturedBlogs = () => {
  return useQuery({
    queryKey: ["featured-blogs"],
    queryFn: fetchFeaturedBlogs,
    staleTime: 1000 * 60,
  });
};

export default useGetFeaturedBlogs;
