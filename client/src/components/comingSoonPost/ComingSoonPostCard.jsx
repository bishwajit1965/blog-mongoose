import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LucideIcon } from "../lucideIcon/LucideIcons";

const ComingSoonPostCard = ({ post }) => {
  const { image, title } = post || {};
  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000?api";
  const [comingSoonPosts, setComingSoonPosts] = useState([]);

  console.log("Coming soon posts", comingSoonPosts);
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
    <div className="lg:col-span-12 col-span-12 mt-2">
      <Link to="/blog-coming-soon" className="m-0 p-0 cursor-pointer">
        <div className="relative inset-0 group rounded-md">
          <div className="rounded-md shadow-lg bg-white p-2">
            <img
              src={post?.image?.url ? post?.image?.url : `${apiURL}${image}`}
              alt=""
              className="lg:h-auto h-56 w-full object-cover rounded-md"
            />
          </div>
          <div className="absolute inset-0 group flex items-center justify-center gap-2 opacity-0 bg-gray-800 hover:opacity-70 rounded-lg p-4 cursor-pointer">
            <div className="space-y-2">
              <h2 className="text-white lg:text-3xl text-sm font-extrabold flex justify-center border-b-4 pb-2">
                Coming soon !
              </h2>
              <h2 className="text-white text-center lg:text-xl text-sm font-bold">
                {title?.length > 50 ? title.slice(0, 50) : title + "..."}
              </h2>

              <div className="flex justify-center">
                <Link
                  to="/"
                  className="text-2xl font-bold text-white flex items-center gap-2"
                >
                  <LucideIcon.Home /> Home Page
                </Link>
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
