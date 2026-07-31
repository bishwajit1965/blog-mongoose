import CountBadge from "../../admin/ui/CountBadge";
import TableDataNotFound from "../../admin/ui/TableDataNotFound";
import FollowButton from "../../components/followButton/FollowButton";
import useLastSeenFormatter from "../../hooks/useLastSeenFormatter";
import useMongoUsers from "../../hooks/useMongoUsers";
import AuthorFollowersCard from "./AuthorFollowersCard";

const AuthorProfileHeader = ({
  profile,
  blogCount,
  onlineStatus,
  followers,
  followerCount,
  authorFollowStatus,
  refreshFollowers,
}) => {
  const { fetchPublicUsers } = useMongoUsers();

  // Online Offline status display
  const { isOnline, lastSeen } = onlineStatus || {};
  const formattedLastSeen = useLastSeenFormatter(lastSeen);

  const { name, avatar, followersCount, followingCount } = profile || {};

  console.log("Profile Header", profile);
  console.log("HEADER FOLLOW STATUS:", authorFollowStatus);
  // Handle refetch after action
  const handleRefetch = async () => {
    await Promise.all([fetchPublicUsers(), refreshFollowers()]);
  };

  return (
    <div className="border lg:p-8 p-4 border-base-content/15 rounded-xl shadow-sm hover:shadow-xl space-y-6">
      <div className="flex justify-center">
        <div className="lg:space-y-4 space-y-2">
          <div className="flex justify-center">
            <img
              src={avatar}
              alt={name}
              className="lg:w-44 lg:h-44 w-28 h-28 rounded-full object-cover bg-slate-300 p-1 shadow-md"
            />
          </div>
          <div className="flex justify-center">
            <div className="space-y-2">
              <h1 className="lg:text-2xl text-lg font-bold text-center">
                {name}
              </h1>
              <p className="flex items-center justify-center">
                {isOnline ? (
                  <span className="text-emerald-600 font-semibold border-2 border-emerald-400 rounded-full px-2 p-0.5">
                    🟢 Online Now
                  </span>
                ) : (
                  <span className="text-gray-500 border-2 border-gray-500 rounded-full px-2 p-0.5">
                    Offline 🔴 Last seen {formattedLastSeen}
                  </span>
                )}
              </p>
              <p className="font-medium text-center lg:max-w-3xl">
                I am Bishwajit Paul, a{" "}
                <span className="font-bold dark:text-amber-500">
                  MERN Full Stack Developer
                </span>{" "}
                passionate about building modern, scalable, and maintainable web
                applications. Nova Journal is my developer diary — a place where
                I document my journey of learning, building, debugging, and
                improving as a software developer.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center lg:gap-8 gap-4">
            <p>{blogCount} Articles</p> → <p>{followersCount} Followers</p> →
            <p>{followingCount} Following</p>
          </div>

          <div className="divider dark:divider-neutral"></div>

          <div className="flex justify-center">
            <FollowButton
              authorId={profile?._id}
              isFollowingInitial={authorFollowStatus?.isFollowing}
              onSuccess={handleRefetch}
            />
          </div>
        </div>
      </div>
      <div className="divider dark:divider-neutral"></div>
      <div className="lg:space-y-6 space-y-3">
        <div className="">
          <h1 className="lg:text-xl text-medium font-bold flex items-center gap-2">
            Author Follower Count: <CountBadge dataLength={followerCount} />
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 justify-between">
          {followers?.length > 0 ? (
            followers?.map((follower) => (
              <AuthorFollowersCard key={follower?._id} follower={follower} />
            ))
          ) : (
            <TableDataNotFound message="No follower data is available !" />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfileHeader;
