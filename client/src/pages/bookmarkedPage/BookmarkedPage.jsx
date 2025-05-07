import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import BlogPostCard from "../blogPosts/BlogPostCard";
import { FaBookmark } from "react-icons/fa";
import { getAllBookmarkedPost } from "../../services/bookmarkApiService";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const BookmarkedPage = () => {
  const { user } = useAuth();

  const fetchBookmarks = async () => {
    const response = await getAllBookmarkedPost();
    return response?.bookmarks;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bookmarked-posts"],
    queryFn: fetchBookmarks,
  });
  console.log("Bookmarked posts", data);
  if (isLoading) return <AdminLoader />;
  if (isError)
    return (
      <div className="flex justify-center">
        <p>Failed to load bookmarked posts.</p>
      </div>
    );

  return (
    <div className="">
      <div className="text-xl font-bold flex items-center space-x-2 px-2">
        <span>
          <FaBookmark />
        </span>{" "}
        <span>Total Bookmarks ➡️</span>
        <span className="w-7 h-7 border-2 flex items-center justify-center border-gray-500 rounded-full p-1 text-sm">
          {data?.length > 0 ? data?.length : 0}
        </span>
      </div>

      {data.length === 0 ? (
        <p className="flex justify-center transform translate-y-60">
          You have not bookmarked any post yet!
        </p>
      ) : (
        data?.map((blog) => (
          <BlogPostCard
            key={blog._id}
            blog={blog}
            user={user}
            bookmarkedAt={blog?.bookmarkedAt}
          />
        ))
      )}
    </div>
  );
};

export default BookmarkedPage;
