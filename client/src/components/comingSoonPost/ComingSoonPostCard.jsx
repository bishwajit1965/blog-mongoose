import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return `${hours}H : ${minutes}M : ${seconds}S`;
  };
  return (
    <div className="lg:col-span-12 col-span-12 lg:mt-4 mt-2">
      <Link to="/blog-coming-soon" className="m-0 p-0 cursor-pointer">
        <div className="relative inset-0 group rounded-md">
          <div className="rounded-md shadow-lg bg-white p-2">
            <img
              src={`${apiURL}${image}`}
              alt=""
              className="lg:h-80 h-80 w-full object-cover rounded-md"
            />
          </div>
          <div className="absolute group top-[32%] left-[5%] right-[5%] bg-gray-800 opacity-70 hover:opacity-0 rounded-lg p-2 cursor-pointer">
            <h2 className="text-white lg:text-2xl font-extrabold text-xl flex justify-center">
              Coming soon !
            </h2>
            <h2 className="text-white text-center lg:text-xl text-lg">
              {title.length > 20 ? title.slice(0, 50) : title + "..."}
            </h2>
          </div>
          <div className="text-center py-2">
            <p className="lg:text-2xl text-xl font-extrabold">
              Remaining: {getTimeRemaining(post.publishAt)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ComingSoonPostCard;
