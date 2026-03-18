import { useState } from "react";
import FollowButton from "../followButton/FollowButton";

const AuthorInfoModal = ({ user, blog, author, title = "User", children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <div className="hover:link">
      <div
        className="items-center lg:space-x- space-x- hover-target relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center space-x-2">
          <div className="">
            {user ? (
              <img
                src={user?.photoURL}
                alt={title.slice(0, 15)}
                className="w-10 rounded-full"
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
              <span>{author.name}</span>
            </p>
          </div>
        </div>

        {isOpen && (
          <div className="absolute left-0 top-10 ml-0 w-80 bg-base-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl p-4 rounded-xl z-50 space-y-2">
            <div className="flex justify-between items-center">
              <img
                src={user?.photoURL}
                alt=""
                className="w-14 h-14 rounded-full"
              />
              <div className="">
                <FollowButton
                  authorId={blog.author?._id} // Mongo _id
                  disabled={!user}
                  isFollowingInitial={
                    user?._id !== blog.author?._id &&
                    user?.following?.some((id) => id.equals(blog.author?._id))
                  }
                />
              </div>
            </div>
            <div className="">
              <p className="text-gray-900 dark:text-base-300 lg:text-xl lg:font-bold text-sm font-semibold flex items-center space-x-2">
                <span>{author.name}</span>
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-base-300">
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
