import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import BlogPostCard from "../blogPosts/BlogPostCard";
import useAuth from "../../hooks/useAuth";
import useGetBookmarkedPosts from "../../hooks/useGetBookmarkedPosts";
import PageTitle from "../../components/pageTitle/PageTitle";
import { Helmet } from "react-helmet-async";

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
    <>
      <Helmet>
        <title>Nova Blogging Platform || Bookmarked Page</title>
      </Helmet>

      <div className="rounded-lg lg:space-y-4 space-y-2">
        <div className="">
          <PageTitle
            title="All My"
            decoratedText="Book Marked Posts"
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
      </div>
    </>
  );
};

export default BookmarkedPage;
