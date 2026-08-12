import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LucideIcon } from "../lucideIcon/LucideIcons";
import useDateFormatter from "../../hooks/useDateFormatter";
import { FaRunning } from "react-icons/fa";

const ComingSoonPostCard = ({ post, pathName }) => {
  const { image, title } = post || {};
  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000?api";
  const [comingSoonPosts, setComingSoonPosts] = useState([]);
  console.log("POST", post);
  console.log("COMING SOON POSTS", comingSoonPosts);
  console.log("Path name", pathName);

  // Update the timer every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setComingSoonPosts((prevPosts) =>
        prevPosts.map((post) => ({
          ...post,
          remainingTime: getTimeRemaining(post.publishAt),
        })),
      );
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const getTimeRemaining = (publishAt) => {
    const publishDate = new Date(publishAt).getTime();
    const now = new Date().getTime();
    const distance = publishDate - now;

    if (distance <= 0) {
      return "Published";
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return `${days}D : ${hours}H : ${minutes}M : ${seconds}S`;
  };

  return (
    <div className="lg:col-span-12 col-span-12 mt-6">
      {post?.length === 0 && (
        <div className="text-center py-4">
          <p className="lg:text-2xl text-medium font-extrabold">
            No coming soon posts available.
          </p>
        </div>
      )}
      <Link to="/blog-coming-soon" className="m-0 cursor-pointer">
        <div className="relative inset-0 group rounded-md">
          <div className="bg-red-500 rounded-md">
            <img
              src={post?.image?.url ? post?.image?.url : `${apiURL}${image}`}
              alt="Coming soon post image"
              className="lg:h-auto h-auto w-full object-cover rounded-md bg-green-500"
            />
          </div>
          <div className="absolute inset-0 group flex items-center justify-center gap-2 opacity-0 bg-gray-800 hover:opacity-70 rounded-lg p-4 cursor-pointer">
            <div className="space-y-2">
              <h2 className="text-white lg:text-3xl text-sm font-extrabold flex items-center justify-center border-b-4 pb-2 gap-2">
                <FaRunning /> Coming soon !
              </h2>
              <h2
                className={`${pathName === "blog-coming-soon" ? "text-white text-center lg:text-xl font-bold" : "text-white text-center text-medium"}`}
              >
                {title?.length > 50 ? title.slice(0, 50) : title + "..."}
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    post?.content?.length > 250
                      ? post?.content.slice(0, 250) + "..."
                      : post?.content,
                }}
                className={`${pathName === "blog-coming-soon" ? "block max-w-xl text-gray-200" : "hidden"}`}
              />

              <div className="flex justify-center">
                <div className="space-y-2">
                  <p
                    className={`${pathName === "blog-coming-soon" ? "text-xl font-bold text-gray-200 flex items-center gap-2" : "text-gray-200 flex items-center gap-2 text-sm"}`}
                  >
                    <LucideIcon.CalendarDays
                      // size={20}
                      className={`${pathName ? "h-6 w-6" : "h-3 w-3"}`}
                    />{" "}
                    Uploaded At: {useDateFormatter(post?.createdAt)}
                  </p>
                  <p
                    className={`${pathName === "blog-coming-soon" ? "text-xl font-bold text-gray-200 flex items-center gap-2" : "text-gray-200 flex items-center gap-2 text-sm"}`}
                  >
                    <LucideIcon.CalendarDays
                      // size={20}
                      className={`${pathName ? "h-6 w-6" : "h-3 w-3"}`}
                    />{" "}
                    Will Publish On: {useDateFormatter(post?.publishAt)}
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                {pathName === "blog-coming-soon" && (
                  <Link
                    to="/"
                    className="text-2xl font-bold text-white flex items-center gap-2"
                  >
                    <LucideIcon.Home /> Home Page
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="text-center py-2 mt-4">
            <p className="lg:text-2xl text-medium font-extrabold">
              Remaining: {getTimeRemaining(post.publishAt)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
2;
export default ComingSoonPostCard;
