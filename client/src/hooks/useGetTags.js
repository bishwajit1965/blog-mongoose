import api from "../helperApiService/helperApiService";
import { useQuery } from "@tanstack/react-query";

const fetchTags = async () => {
  const response = await api.get("/tags");
  return response.data;
};

const useGetTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: 1000 * 60, // 1 minute cache
  });
};

export default useGetTags;
