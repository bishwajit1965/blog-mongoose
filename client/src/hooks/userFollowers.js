import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../helperApiService/helperApiService";

// Follow a user
export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (authorId) => {
      const res = await api.put(`/follow-users/${authorId}/follow`);
      return res.data;
    },
    onSuccess: (_, authorId) => {
      queryClient.invalidateQueries(["user", authorId]);
      queryClient.invalidateQueries(["currentUser"]); // keeps logged-in user updated
    },
  });
};

// Unfollow a user
export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (authorId) => {
      const res = await api.delete(`/follow-users/${authorId}/unfollow`);
      return res.data;
    },
    onSuccess: (_, authorId) => {
      queryClient.invalidateQueries(["user", authorId]);
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
};
