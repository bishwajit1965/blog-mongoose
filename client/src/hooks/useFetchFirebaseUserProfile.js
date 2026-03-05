// This hook fetches the user profile from the server using the Firebase UID.

import api from "../helperApiService/helperApiService";
import { useQuery } from "@tanstack/react-query";

const fetchUserProfile = async (firebaseUid) => {
  const response = await api.get(`/users/firebase/${firebaseUid}`);
  return response.data;
};

const useFetchFirebaseUserProfile = (firebaseUid) => {
  return useQuery({
    queryKey: ["userProfile", firebaseUid],
    queryFn: () => fetchUserProfile(firebaseUid),
    enabled: !!firebaseUid, // Prevents query if firebaseUid is undefined or null
    staleTime: 1000 * 60, // Cache for 1 minute
  });
};

export default useFetchFirebaseUserProfile;
