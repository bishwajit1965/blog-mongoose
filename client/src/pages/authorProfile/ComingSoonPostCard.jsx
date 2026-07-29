import { useEffect } from "react";
import useDateFormatter from "../../hooks/useDateFormatter";
import { useState } from "react";

const ComingSoonPostCard = ({ comingSoon, comingSoonPosts }) => {
  const { title, excerpt, image, publishAt } = comingSoon || {};
  const [comingSoonPostsData, setComingSoonPostsData] = useState([]);

  const formattedDate = useDateFormatter(publishAt);

  // Update the timer every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setComingSoonPostsData((prevPosts) =>
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
    <div
      className={`${comingSoonPosts?.length === 1 ? "lg:col-span-12 col-span-12" : comingSoonPosts?.length === 2 ? "lg:col-span-6 col-span-12" : "lg:col-span-4 col-span-12"}}`}
    >
      <div className="border dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl">
        <img
          src={image?.url}
          alt={title.slice(0, 10)}
          className="w-full lg:h-72 h-auto object-cover rounded-t-xl"
        />
        <div className="p-4 space-y-2">
          <h2 className="lg:text-xl text-lg font-bold">
            {title?.length >= 56 ? title?.slice(0, 56) + "..." : title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
            {excerpt}
          </p>
          {comingSoonPostsData && (
            <p className="lg:text-medium text-sm font-bold">
              Will Publish At: {formattedDate}
            </p>
          )}
          {comingSoonPostsData && (
            <p className="lg:text-xl text-medium font-extrabold text-gray-700 dark:text-gray-300">
              Releases In: {getTimeRemaining(publishAt)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPostCard;
