import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import api from "../helperApiService/helperApiService";

// Fetch comments list
const fetchCommentsList = async (slug) => {
  const response = await api.get(`/comments/counts/${slug}`);
  return response.data;
};

// Create a new comment
const createComment = async ({ slug, commentData }) => {
  const response = await api.post(`/comment/${slug}`, commentData);
  return response.data;
};

// Update (edit) an existing comment
const updateComment = async ({ id, updatedData }) => {
  const response = await api.patch(`/edit-comment/${id}`, updatedData);
  return response.data;
};

// Unified custom hook
export const useComments = (slug) => {
  const queryClient = useQueryClient();

  // Fetch comments
  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["comments", slug],
    queryFn: () => fetchCommentsList(slug),
    enabled: !!slug,
    staleTime: 1000 * 60, // 1 minute
  });

  // Create comment
  const { mutate: addComment, isPending: isAdding } = useMutation({
    mutationFn: (commentData) => createComment({ slug, commentData }),
    onSuccess: () => {
      // Refetch comments after successful comment creation
      queryClient.invalidateQueries({ queryKey: ["comments", slug] });
    },
  });

  // Update (edit) comment
  const { mutate: editComment, isPending: isEditing } = useMutation({
    mutationFn: ({ commentId, updatedData }) =>
      updateComment({ commentId, updatedData }),
    onSuccess: () => {
      // Refetch comments after successful comment update
      queryClient.invalidateQueries({ queryKey: ["comments", slug] });
    },
  });

  return {
    comments,
    isLoading,
    isError,
    addComment, // function to create a comment
    isAdding, // loading state when creating comment
    editComment, // function to edit/update a comment
    isEditing, // loading state when editing comment
  };
};
