import API_PATHS from "../admin/adminServices/apiPaths";
import api from "../helperApiService/helperApiService";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const useFlagBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ slug, reason, comment }) => {
      const response = await api.patch(`${API_PATHS.BLOGS}/flag/${slug}`, {
        slug,
        reason,
        comment,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      toast.success("Blog post flagged successfully!");
    },

    onError: (error) => {
      const message = error.response?.data?.message || error.message;
      if (message === "You have already flagged this post.") {
        toast.info("You have already flagged this post.");
      } else {
        toast.error(`Error flagging blog post: ${error.message}`);
      }
    },
  });
};

export default useFlagBlogPost;
