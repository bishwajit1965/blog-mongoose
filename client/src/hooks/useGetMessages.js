import api from "../helperApiService/helperApiService";
import { useQuery } from "@tanstack/react-query";

const fetchMessages = async () => {
  const response = await api.get("/messages");
  return response.data;
};

const useGetMessages = () => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
    staleTime: 1000 * 60,
  });
};

export default useGetMessages;
