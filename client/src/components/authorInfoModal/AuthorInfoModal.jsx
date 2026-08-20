import { useState } from "react";
import FollowButton from "../followButton/FollowButton";
import useMongoUsers from "../../hooks/useMongoUsers";

const AuthorInfoModal = ({ user, blog, author, title = "User", children }) => {
  const { publicUsers, fetchPublicUsers } = useMongoUsers();
  const [isOpen, setIsOpen] = useState(false);
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  // Current Mongo User in BlogDetails Page
  const currentMongoUser = publicUsers?.find(
    (mongoUser) => mongoUser.firebaseUid === user?.uid,
  );

  return (
    <div className="hover:link">
      <div
        className="items-center hover-target relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center space-x-2">
          <div className="">
            {user ? (
              <img
                src={author?.avatar}
                alt={author?.name?.slice(0, 10)}
                className="w-10 h-10 object-cover rounded-full bg-slate-300 p-0.5 drop-shadow-lg drop-shadow-slate-500 distant-soft"
              />
            ) : (
              <img
                src="https://i.ibb.co.com/1z7P2wJ/girl2.jpg"
                alt=""
                className="w-10 rounded-full"
              />
            )}
          </div>
          <div className="">
            <p className="text-gray-500 dark:text-base-300 lg:text-base text-sm flex items-center font-bold space-x-2">
              <span>{author?.name}</span>
            </p>
          </div>
        </div>

        {isOpen && (
          <div className="absolute left-0 top-10 ml-0 lg:w-80 w-[17rem] bg-base-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl p-4 rounded-xl z-30 space-y-2 dark:text-gray-400 min-h-80">
            <div className="flex justify-between items-center">
              <img
                src={author?.avatar}
                alt={title}
                className="w-10 h-10 rounded-full bg-gray-300 p-0.5 shadow"
              />
              <div className="">
                <FollowButton
                  authorId={blog?.author?._id} // Mongo _id
                  disabled={!user}
                  isFollowingInitial={currentMongoUser?.following?.includes(
                    blog.author._id,
                  )}
                  onSuccess={fetchPublicUsers}
                />
              </div>
            </div>
            <div className="">
              <p className="text-gray-900 dark:text-base-300 lg:text-xl lg:font-bold text-sm font-semibold flex items-center space-x-2">
                <span>{author.name}</span>
              </p>
            </div>
            <p>MERN Full Stack Developer</p>

            <p className="text-xs text-gray-600 dark:text-base-300">
              I am a developer. I develop websites with utmost care and keep in
              mind about modern technologies in use.
            </p>

            {children ? (
              <>{children}</>
            ) : (
              <p className="text-sm text-gray-600 dark:text-base-300">
                No additional info provided.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorInfoModal;
