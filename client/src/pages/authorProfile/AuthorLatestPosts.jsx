import TableDataNotFound from "../../admin/ui/TableDataNotFound";
import LatestPostCard from "./LatestPostCard";

const AuthorLatestPosts = ({ latestPosts }) => {
  return (
    <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-6 gap-4">
      {latestPosts?.length > 0 ? (
        latestPosts?.map((latestPost) => (
          <LatestPostCard
            key={latestPost?._id}
            latestPost={latestPost}
            latestPosts={latestPosts}
          />
        ))
      ) : (
        <TableDataNotFound />
      )}
    </div>
  );
};

export default AuthorLatestPosts;
