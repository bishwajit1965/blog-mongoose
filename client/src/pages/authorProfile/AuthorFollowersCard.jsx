const AuthorFollowersCard = ({ follower }) => {
  console.log("Follower", follower);
  const { name, avatar } = follower || {};
  return (
    <div className="lg:col-span-3 col-span-12">
      <div className="border dark:border-gray-600 p-4 rounded-xl shadow-md hover:shadow-xl text-center">
        <div className="flex justify-center">
          <img
            src={avatar}
            alt={name}
            className="object-cover h-20 w-20 rounded-full"
          />
        </div>
        <h1>{name}</h1>
      </div>
    </div>
  );
};

export default AuthorFollowersCard;
