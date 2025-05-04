import {
  approveComment,
  deleteCommentByAdmin,
  getAllCommentsForAdmin,
  rejectComment,
} from "../adminServices/adminCommentApiService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAdminComments = () => {
  const queryClient = useQueryClient();

  // Fetch all comments
  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-comments"],
    queryFn: getAllCommentsForAdmin,
    staleTime: 1000 * 60, // 1 minute
  });

  // Approve a comment
  const { mutate: approve, isPending: isApproving } = useMutation({
    mutationFn: ({ commentId, commentData }) =>
      approveComment(commentId, commentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-comments"] });
    },
  });

  // Reject a comment
  const { mutate: reject, isPending: isRejecting } = useMutation({
    mutationFn: ({ commentId, commentData }) =>
      rejectComment(commentId, commentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-comments"] });
    },
  });

  // Delete a comment
  const { mutate: remove, isPending: isDeleting } = useMutation({
    mutationFn: deleteCommentByAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-comments"] });
    },
  });

  return {
    comments,
    isLoading,
    isError,
    approve,
    isApproving,
    reject,
    isRejecting,
    remove,
    isDeleting,
  };
};
