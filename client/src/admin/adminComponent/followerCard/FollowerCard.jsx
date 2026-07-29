const FollowerCard = ({ follower }) => {
  const { name, email, avatar } = follower || {};
  return (
    <div className="lg:col-span-3 col-span-12">
      <div className="space-y-4 border rounded-xl border-base-content/15 dark:border-gray-600 p-4 shadow-sm hover:shadow-xl">
        <div className="flex justify-center">
          <img
            src={avatar}
            alt={name}
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>

        <div className="flex justify-center">
          <div className="">
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">{email}</p>
            <p className="text-xs text-gray-400">
              Joined: {new Date(follower.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowerCard;
