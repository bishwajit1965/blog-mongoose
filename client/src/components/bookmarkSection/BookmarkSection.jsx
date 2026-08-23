import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import useGetBookmarkedPosts from "../../hooks/useGetBookmarkedPosts";
import { motion } from "framer-motion";
import BlogPostCard from "../../pages/blogPosts/BlogPostCard";
import BlogPostSkeleton from "../../pages/blogPosts/BlogPostSkeleton";
const BookmarkSection = () => {
  const { user } = useAuth();
  const { data, isLoading, isError } = useGetBookmarkedPosts();

  if (isLoading) {
    return (
      <div className="col-span-12 lg:col-span-8">
        {[...Array(5)].map((_, index) => (
          <BlogPostSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError)
    return (
      <div className="flex justify-center">
        <p>Failed to load bookmarked posts.</p>
      </div>
    );
  return (
    <div>
      <Helmet>
        <title>Nova Journal || Bookmarked Section</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="lg:space-y-6 space-y-4"
      >
        {!data?.bookmarks || data.bookmarks.length === 0 ? (
          <p className="flex justify-center transform translate-y-60">
            You have not bookmarked any post yet!
          </p>
        ) : (
          data?.bookmarks?.length > 0 &&
          data?.bookmarks?.map((blog) => (
            <BlogPostCard
              key={blog._id}
              blog={blog}
              user={user}
              bookmarkedAt={blog?.bookmarkedAt}
              showAuthorInfoModal={true}
              showSocialLinks={true}
              showComments={false}
              showBookmark={true}
              showPublishDate={true}
              showCategory={true}
              showTags={false}
            />
          ))
        )}
      </motion.div>
    </div>
  );
};

export default BookmarkSection;
