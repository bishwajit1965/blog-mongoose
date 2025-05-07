import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import {
  bookMarkPost,
  getAllBookmarkedPost,
  removeBookmark,
} from "../../services/bookmarkApiService";
import { useCallback, useEffect, useState } from "react";

import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const BookmarkButton = ({ blogId }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  console.log("Is bookmarked", isBookmarked);

  const fetchBookmarks = useCallback(async () => {
    try {
      const response = await getAllBookmarkedPost(); // returns { success, bookmarks }
      if (response?.success && Array.isArray(response.bookmarks)) {
        const bookmarkIds = response.bookmarks.map((blog) => blog._id);
        setIsBookmarked(bookmarkIds.includes(blogId));
      }
    } catch (error) {
      console.error("Error in fetching bookmarks", error);
    }
  }, [blogId]);

  useEffect(() => {
    // Only fetch if we didn’t get initial value
    if (user) {
      fetchBookmarks();
    }
  }, [fetchBookmarks, user]);

  const handleToggleBookmark = async () => {
    try {
      setLoading(true);
      if (isBookmarked) {
        const response = await removeBookmark(blogId);
        if (response.success) {
          toast.info(response.message || "Bookmark has been removed!");
        }
      } else {
        const response = await bookMarkPost(blogId);
        if (response.success) {
          toast.success(response.message || "Blog post is bookmarked!");
        }
        console.log("BOOKmark response", response);
      }
      setIsBookmarked(!isBookmarked);
    } catch (err) {
      console.error("Bookmark error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div>
      <button
        onClick={handleToggleBookmark}
        disabled={loading}
        title={
          isBookmarked
            ? "Click to remove bookmark"
            : "Click to bookmark this post"
        }
        className={`px-3 py-1 btn btn-xs rounded flex items-center gap-1 ${
          isBookmarked ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
        {isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
      </button>
    </div>
  );
};

export default BookmarkButton;
