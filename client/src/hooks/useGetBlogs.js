import api from "../publicHelperApis/helperApiService";
import { useQuery } from "@tanstack/react-query";

const fetchBlogs = async () => {
  const response = await api.get("/blogs");
  return response.data;
};

const useGetBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    staleTime: 1000 * 60, // 1 minute cache
  });
};

export default useGetBlogs;
