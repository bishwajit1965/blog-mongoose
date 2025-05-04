// import api from "../services/api";

import api from "../helperApiService/helperApiService";
import { useQuery } from "@tanstack/react-query";

const fetchCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60, // 1 minute cache
  });
};

export default useGetCategories;
