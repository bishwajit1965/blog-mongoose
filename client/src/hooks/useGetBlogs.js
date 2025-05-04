// This file defines a custom React hook that fetches blog data from an API using Axios and React Query.
// It uses the `useQuery` hook from React Query to manage the fetching and caching of the data.
// Date: 20.04.2025 12:00:00

// import api from "../services/api";

import api from "../helperApiService/helperApiService";
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
