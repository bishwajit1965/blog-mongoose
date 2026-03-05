import api from "../helperApiService/helperApiService";
import { useMutation } from "@tanstack/react-query";

const useApiMutation = ({
  url,
  method = "post",
  headers = {},
  onSuccess,
  onError,
  onSettled,
  retry = 1,
  select,
  mutationFn, // allow full override if needed
}) => {
  return useMutation({
    mutationFn:
      mutationFn ||
      ((data) =>
        api({
          method,
          url,
          headers,
          ...(method === "get" ? { params: data } : { data }),
        }).then((res) => res.data)),
    onSuccess,
    onError,
    onSettled,
    retry,
    select,
  });
};

export default useApiMutation;
