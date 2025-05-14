import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import BlogPostCard from "../blogPosts/BlogPostCard";
import useAuth from "../../hooks/useAuth";
import useGetBookmarkedPosts from "../../hooks/useGetBookmarkedPosts";

const BookmarkedPage = () => {
  const { user } = useAuth();
  const { data, isLoading, isError } = useGetBookmarkedPosts();

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
      {data?.bookmarks.length === 0 ? (
        <p className="flex justify-center transform translate-y-60">
          You have not bookmarked any post yet!
        </p>
      ) : (
        data?.bookmarks.map((blog) => (
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
