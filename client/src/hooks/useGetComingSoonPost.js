import api from "../helperApiService/helperApiService";
import { useQuery } from "@tanstack/react-query";

const fetchComingSoonPosts = async () => {
  const response = api.get("/posts/coming-soon");
  return (await response).data;
};

const useGetComingSoonPost = () => {
  return useQuery({
    queryKey: ["coming-soon"],
    queryFn: fetchComingSoonPosts,
    staleTime: 1000 * 60,
  });
};

export default useGetComingSoonPost;
