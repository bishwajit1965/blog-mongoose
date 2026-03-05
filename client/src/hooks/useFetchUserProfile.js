import api from "../helperApiService/helperApiService";
import { useQuery } from "@tanstack/react-query";

const fetchAllUsers = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

const useFetchAllUserProfile = () => {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: fetchAllUsers,
    staleTime: 1000 * 60, // Cache for 1 minute
  });
};

export default useFetchAllUserProfile;
