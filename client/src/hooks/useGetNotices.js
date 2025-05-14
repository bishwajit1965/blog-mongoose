// TanStacc Query to fetch all notices to front end

import api from "../helperApiService/helperApiService";
import { useQuery } from "@tanstack/react-query";

const fetchNotices = async () => {
  const response = await api.get("/notifications/active");
  return response.data;
};

const useGetNotices = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotices,
    staleTime: 1000 * 60,
  });
};

export default useGetNotices;
