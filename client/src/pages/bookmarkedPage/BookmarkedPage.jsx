import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import BlogPostCard from "../blogPosts/BlogPostCard";
import useAuth from "../../hooks/useAuth";
import useGetBookmarkedPosts from "../../hooks/useGetBookmarkedPosts";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import CustomPageTitle from "../../components/pageTitle/CustomPageTitle";

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
    <div className="max-w-6xl mx-auto">
      <Helmet>
        <title>Nova Blogging Platform || Bookmarked Page</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-lg lg:space-y-4 space-y-2"
      >
        <div className="">
          <CustomPageTitle
            title="My Book Marked Posts"
            dataLength={data?.bookmarks?.length}
          />
        </div>
        {!data?.bookmarks || data.bookmarks.length === 0 ? (
          <p className="flex justify-center transform translate-y-60">
            You have not bookmarked any post yet!
          </p>
        ) : (
          data.bookmarks.map((blog) => (
            <BlogPostCard
              key={blog._id}
              blog={blog}
              user={user}
              bookmarkedAt={blog?.bookmarkedAt}
            />
          ))
        )}
      </motion.div>
    </div>
  );
};

export default BookmarkedPage;
