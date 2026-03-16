import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../publicHelperApis/firebaseApiService";
import { getAuth } from "firebase/auth";

// Follow a user
export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (authorId) => {
      const auth = getAuth();
      if (!auth.currentUser) throw new Error("User not logged in");

      // No need to fetch token manually — interceptor handles it
      const res = await api.put(`/follow-users/${authorId}/follow`);
      return res.data;
    },
    onSuccess: (_, authorId) => {
      queryClient.invalidateQueries(["user", authorId]);
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
};

// Unfollow a user
export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (authorId) => {
      const auth = getAuth();
      if (!auth.currentUser) throw new Error("User not logged in");

      const res = await api.delete(`/follow-users/${authorId}/unfollow`);
      return res.data;
    },
    onSuccess: (_, authorId) => {
      queryClient.invalidateQueries(["user", authorId]);
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
};
