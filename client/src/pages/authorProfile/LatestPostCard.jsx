import { FaList, FaTags } from "react-icons/fa";
import Badge from "../../admin/ui/Badge";
import Button from "../../components/buttons/Button";
import { LucideIcon } from "../../components/lucideIcon/LucideIcons";
import useDateFormatter from "../../hooks/useDateFormatter";

const LatestPostCard = ({ latestPost, latestPosts }) => {
  const { author, tags, title, category, slug, excerpt, image, publishAt } =
    latestPost || {};
  console.log("Latest post", latestPost);
  const formattedDate = useDateFormatter(publishAt);

  return (
    <div
      className={`${latestPosts?.length === 1 ? "lg:col-span-12 col-span-12" : latestPosts?.length === 2 ? "lg:col-span-6 col-span-12" : latestPosts?.length > 2 ? "lg:col-span-4 col-span-12" : "lg:col-span-4 col-span-12"}`}
    >
      <div className="border dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl">
        <div className="space-y-3">
          <div className="">
            <img
              src={image?.url}
              alt={title}
              className="lg:h-44 h-auto w-full object-cover rounded-t-xl"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 px-4">
            <div className="flex items-center justify-between gap-2">
              <img
                src={author?.avatar}
                alt={slug}
                className="object-cover w-10 h-10 rounded-full bg-gray-400 p-0.5"
              />
              <span className="text-xs font-bold">{author?.name}</span>{" "}
            </div>
            <div className="flex items-center gap-2 text-xs">
              <LucideIcon.CalendarDays size={14} />
              {formattedDate}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 px-4">
            <div className="lg:col-span-6 col-span-12 flex flex-wrap items-center gap-2">
              <FaList size={18} /> <Badge color="gray">{category?.name}</Badge>
            </div>
            <div className="lg:col-span-6 col-span-12 flex flex-wrap items-center gap-2">
              <FaTags size={18} />{" "}
              {tags?.slice(0, 2)?.map((tag) => (
                <Badge key={tag?._id} color="gray">
                  {tag?.name}
                </Badge>
              ))}
              <span className="pb-">{tags?.length > 2 ? "..." : ""}</span>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <h1 className="lg:text-xl test-lg font-bold line-clamp-2">{title}</h1>
          <p className="line-clamp-3">{excerpt}</p>

          <div className="flex justify-end">
            <Button
              href={`/blog-details/${slug}`}
              variant="outline"
              label="Read More"
              size="xs"
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
