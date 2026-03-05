import api from "../helperApiService/helperApiService";
import { useQuery } from "@tanstack/react-query";

const fetchRelatedBlogPosts = async (slug) => {
  const response = await api.get(`/blogs/related-posts/${slug}`);
  return response.data;
};

const useGetRelatedPosts = (slug) => {
  return useQuery({
    queryKey: ["relatedPosts", slug],
    queryFn: () => fetchRelatedBlogPosts(slug),
    enabled: !!slug, // Prevents fetching if slug is undefined or empty
    staleTime: 1000 * 60, // 1 minute cache
  });
};

export default useGetRelatedPosts;
