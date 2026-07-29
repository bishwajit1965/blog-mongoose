import TableDataNotFound from "../../admin/ui/TableDataNotFound";
import ComingSoonPostCard from "./ComingSoonPostCard";

const AuthorComingSoonPosts = ({ comingSoonPosts }) => {
  return (
    <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-8 gap-4 justify-between">
      {comingSoonPosts?.length > 0 ? (
        comingSoonPosts?.map((comingSoon) => (
          <ComingSoonPostCard
            key={comingSoon?._id}
            comingSoon={comingSoon}
            comingSoonPosts={comingSoonPosts}
          />
        ))
      ) : (
        <TableDataNotFound message="No upcoming articles are scheduled. Check back later!" />
      )}
    </div>
  );
};

export default AuthorComingSoonPosts;
