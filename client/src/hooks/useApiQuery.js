import api from "../helperApiService/helperApiService";
import { useQuery } from "@tanstack/react-query";

const useApiQuery = ({
  key,
  url,
  params = {},
  enabled = true,
  select,
  onSuccess,
  fetcher = (url, params) => api.get(url, { params }).then((res) => res.data),
  retry = 1,
  staleTime = 0,
  cacheTime = 5 * 60 * 1000,
}) => {
  return useQuery({
    queryKey: [key, params],
    queryFn: () => fetcher(url, params),
    enabled,
    select,
    onSuccess,
    retry,
    staleTime,
    cacheTime,
  });
};

export default useApiQuery;

// Usage example:
// const { data, isLoading, error } = useApiQuery({
//   key: "userProfile",
//   url: "/users/profile",
//   params: { userId: "123" },
//   enabled: true,
//   select: (data) => data.user,
//   onSuccess: (data) => console.log("Data fetched successfully:", data),
//   fetcher: (url, params) => api.get(url, { params }).then((res) => res.data),
// });
// This hook can be used in any component to fetch data from the API using React Query.

// EASY EXAMPLE:
// const { data } = useApiQuery({
//   key: "user",
//   url: "/users/profile/" + firebaseUid,
//   params: { detailed: true },
// });
