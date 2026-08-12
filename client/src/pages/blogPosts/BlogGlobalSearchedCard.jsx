import {
  FaBookReader,
  FaQuoteLeft,
  FaReadme,
  FaTags,
  FaThList,
} from "react-icons/fa";

import Button from "../../components/buttons/Button";
import { LucideIcon } from "../../components/lucideIcon/LucideIcons";
import dateFormatter from "../../utils/dateFormatter";
import { Link } from "react-router-dom";
import Badge from "../../admin/ui/Badge";
import BlogReadingTimeCounter from "../../components/blogReadingTimeCounter/BlogReadingTimeCounter";

const BlogGlobalSearchedCard = ({ blog }) => {
  console.log("Searched Blogs", blog);
  const {
    title,
    slug,
    image,
    author,
    content,
    excerpt,
    category,
    tags,
    publishAt,
  } = blog || {};

  return (
    <div className="lg:col-span-4 col-span-12 rounded-xl shadow-md border dark:border-gray-700">
      {/* Image */}
      <Link to={`/blog-details/${slug}`} className="m-0">
        <div className="rounded-t-xl h-44 w-ful">
          <img
            src={image?.url}
            alt={slug}
            className="object-cover rounded-t-xl lg:h-44 h-auto w-full"
          />
        </div>
      </Link>

      {/* Blog data container */}
      <div className="p-4 rounded-b-xl lg:space-y-4 space-y-2 lg:min-h-[28rem] relative min-h-[29rem]">
        {/* Title */}
        <div className="">
          <Link to={`/blog-details/${slug}`} className="m-0">
            <h2 className="lg:text-xl text-lg font-extrabold capitalize text-gray-800 dark:text-gray-400 first-letter:font-roboto first-letter:capitalize first-letter:text-amber-600 first-letter:font-extrabold lg:first-letter:text-2xl first-letter:text-2xl first-letter:text-extra-bold line-clamp-2">
              {title.length > 64 ? `${title.slice(0, 64)}...` : title}
            </h2>
          </Link>
        </div>

        {/* Author */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-gray-700 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <img
              src={blog?.author?.avatar}
              alt={slug}
              className="object-cover h-12 w-12 rounded-full bg-gray-400 p-0.5 shadow"
            />
            <span className="text-medium font-bold text-gray-500 dark:text-gray-400">
              {author?.name}
            </span>
          </div>
          <div className="text-sm flex items-center gap-1">
            <LucideIcon.CalendarDays size={14} /> {dateFormatter(publishAt)}
          </div>
        </div>

        {/* category, tags, comment, bookmark */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaThList size={18} /> <Badge colors="blue">{category.name}</Badge>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1">
            <FaTags size={18} />
            {tags && tags?.length > 0 ? (
              tags?.slice(0, 2)?.map((tag) => (
                <Badge key={tag?._id} colors="blue">
                  {tag?.name}
                </Badge>
              ))
            ) : (
              <span className="text-gray-400 dark:bg-gray-800 dark:text-gray-400">
                Not available.
              </span>
            )}
            <span className="pb-2">{tags?.length > 2 ? "..." : ""}</span>
          </div>
        </div>

        {/* Excerpt */}
        <div className="">
          <div className="">
            {excerpt ? (
              <div className="lg:min-h-[5rem] min-h-[5rem]">
                <div className="relative">
                  <FaQuoteLeft className="absolute top-0 text-xl text-gray-600 dark:text-gray-300" />
                  <p
                    className="absolute top-0 left-0 right-0 indent-7 dark:text-gray-400 italic line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html:
                        excerpt?.length > 150
                          ? blog?.excerpt.slice(0, 150) + "..."
                          : blog?.excerpt,
                    }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-red-500 text-md font-bold">
                😃 No blog summary is available now.
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="">
          <div
            dangerouslySetInnerHTML={{
              __html:
                content.length > 200 ? `${content.slice(0, 200)}...` : content,
            }}
            className="prose max-w-none list-decimal text-gray-700 dark:text-gray-400 mb-4 text-pretty line-clamp-3"
          />
        </div>

        <div className="absolute bottom-2 left-4 right-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="lg:text-[16px] text-sm text-gray-500 font-bold italic border border-gray-400 dark:border-gray-700 dark:text-gray-300 dark:bg-gray-800 rounded-full shadow-sm lg:py-1 py-[4px] lg:px-2.5 px-1 flex items-center justify-center lg:space-x-2 space-x-1 w-content">
              <span>
                <FaReadme />
              </span>
              <span>Read in:</span>
              <span className="italics">
                {<BlogReadingTimeCounter content={content} />}
              </span>
            </div>

            <div className="">
              <Button
                href={`/blog-details/${slug}`}
                size="xs"
                variant="outline"
                label="Read More"
                icon={<FaBookReader />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogGlobalSearchedCard;
