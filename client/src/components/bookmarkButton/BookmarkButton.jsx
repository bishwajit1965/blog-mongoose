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
        className={`px-2 py-0.5 btn btn-xs rounded flex items-center gap-1 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-700 ${
          isBookmarked
            ? "bg-amber-500 text-white dark:bg-amber-500"
            : "bg-base-100 text-gray-700 dark:text-gray-400"
        }`}
      >
        {isBookmarked ? (
          <FaBookmark className="lg:h-3 lg:w-3 w-2.5 h-2.5 dark:text-gray-400" />
        ) : (
          <FaRegBookmark className="lg:h-3 lg:w-3 w-2.5 h-2.5 dark:text-gray-400" />
        )}
        {isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
      </button>
    </div>
  );
};

export default BookmarkButton;
