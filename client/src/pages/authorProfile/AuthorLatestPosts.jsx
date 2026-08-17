import TableDataNotFound from "../../admin/ui/TableDataNotFound";
import BlogCard from "../../components/canonicalBlogCard/BlogCard";

const AuthorLatestPosts = ({ latestPosts, user }) => {
  return (
    <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-6 gap-4">
      {latestPosts?.length > 0 ? (
        latestPosts?.map((latestPost) => (
          <div key={latestPost?._id} className="lg:col-span-4 col-span-12">
            <BlogCard
              user={user}
              post={latestPost}
              blog={latestPost}
              authorInfoModal={true}
              showSocialLinks={true}
              showContent={true}
              showComments={false}
              showBookmark={true}
              showAuthor={true}
            />
          </div>
        ))
      ) : (
        <TableDataNotFound />
      )}
    </div>
  );
};

export default AuthorLatestPosts;
