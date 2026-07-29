import CTAButton from "../../components/buttons/CTAButton";
import { LucideIcon } from "../../components/lucideIcon/LucideIcons";

const LatestPostCard = ({ latestPost, latestPosts }) => {
  console.log("LAtest post", latestPost);
  const { title, slug, excerpt, image } = latestPost || {};
  return (
    <div
      className={`${latestPosts?.length === 1 ? "lg:col-span-12 col-span-12" : latestPosts?.length === 2 ? "lg:col-span-6 col-span-12" : latestPosts?.length > 2 ? "lg:col-span-4 col-span-12" : "lg:col-span-4 col-span-12"}`}
    >
      <div className="border dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl">
        <div className="">
          <img
            src={image?.url}
            alt={title}
            className="lg:h-44 h-auto w-full object-cover rounded-t-xl"
          />
        </div>
        <div className="p-4 space-y-2">
          <h1 className="lg:text-xl test-lg font-bold line-clamp-2">{title}</h1>
          <p className="line-clamp-3">{excerpt}</p>

          <div className="flex justify-end">
            <CTAButton
              href={`/blog-details/${slug}`}
              variant="primary"
              label="Read More"
              size="sm"
              icon={<LucideIcon.BookOpen size={14} />}
              className="dark:bg-gray-600 dark:border-gray-700 dark:hover:bg-gray-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestPostCard;
