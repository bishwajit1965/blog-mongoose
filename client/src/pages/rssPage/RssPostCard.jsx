import { FaFileWord, FaQuoteLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LucideIcon } from "../../components/lucideIcon/LucideIcons";
import useDateFormatter from "../../hooks/useDateFormatter";
import Badge from "../../admin/ui/Badge";
import useWordCount from "../../admin/adminHooks/useWordCount";
import BlogReadingTimeCounter from "../../components/blogReadingTimeCounter/BlogReadingTimeCounter";
import BookmarkButton from "../../components/bookmarkButton/BookmarkButton";

const RssPostCard = ({
  post,

  // Required features
  showBlogPostImage = true,
  showTitle = true,
  showAuthor = true,
  showAuthorAvatar = true,
  showWordCount = true,
  showReadingTime = true,
  showExcerpt = true,
  showReadMore = true,

  // Optional features
  showContent = false,
  showBookmark = false,
  showPublishDate = false,
  showCategory = false,

  // Optional limits
  titleLimit = 60,
  excerptLimit = 150,
  contentLimit = 130,
}) => {
  const {
    link,
    id,
    title,
    author,
    content,
    avatar,
    category,
    description,
    publishDate,
    image,
  } = post;

  console.log("Post", post);
  /**================================
   * HELPERS
  ===================================*/
  const displayTitle =
    title?.length > titleLimit ? `${title.slice(0, titleLimit)}...` : title;

  const formattedDate = useDateFormatter(publishDate);

  const wordCount = useWordCount(content);

  const displayExcerpt =
    description?.length > excerptLimit
      ? `${description.slice(0, excerptLimit)}...`
      : description;

  const displayContent =
    content?.length > contentLimit
      ? `${content.slice(0, contentLimit)}...`
      : content;

  return (
    <>
      <div className="text-gray-700 dark:text-gray-400 bg-white shadow-lg dark:shadow-sm dark:bg-gray-800 rounded-xl">
        {/* Show blog image */}
        {showBlogPostImage && image && (
          <Link to={`${link}`} className="m-0">
            <div className="">
              <img
                src={image}
                alt={post.title}
                className="w-full lg:h-48 h-auto object-cover rounded-t-xl cursor-pointer"
              />
            </div>
          </Link>
        )}

        <div className="lg:p-6 p-4 lg:space-y-4 space-y-2 relative lg:min-h-[25rem] min-h-[45rem]">
          {/* SHOW AUTHOR AVATAR / AUTHOR / PUB DATE BEGINS */}
          {(showAuthorAvatar || showAuthor || showPublishDate) && (
            <div className="lg:flex grid items-center justify-between lg:gap-4 gap-2">
              {showAuthorAvatar && (
                <Link to={`${link}`} className="m-0">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      <img
                        src={avatar}
                        alt={post?.title?.slice(0, 15)}
                        className="w-10 h-10 rounded-full bg-gray-400 p-0.5 cursor-pointer"
                      />
                    </div>
                    {showAuthor && (
                      <p className="font-bold text-gray-700 dark:text-gray-400">
                        {author}
                      </p>
                    )}
                  </div>
                </Link>
              )}
              {showPublishDate && (
                <p className="text-gray-700 dark:text-gray-400 text-xs font-bold flex items-center gap-1">
                  <LucideIcon.CalendarDays size={14} />
                  <em>{formattedDate}</em>
                </p>
              )}
            </div>
          )}
          {/* SHOW AUTHOR AVATAR / AUTHOR / PUB DATE ENDS */}

          {/* SHOW CATEGORY / WORD COUNT / SHOW READING TIME BEGINS */}
          {(showCategory || showWordCount || showReadingTime) && (
            <div className="lg:flex grid items-center justify-between lg:gap-4 gap-2">
              {/* Category */}
              {showCategory && category && (
                <p className="flex items-center gap-1 text-gray-700 dark:text-gray-400">
                  <LucideIcon.List size={14} />
                  <Badge color="blue">{category}</Badge>
                </p>
              )}

              {/* Word count */}
              {showWordCount && wordCount && (
                <div className="flex items-center gap-1">
                  <FaFileWord size={14} />
                  <Badge color="gray">{wordCount} words</Badge>
                </div>
              )}

              {/* Reading time */}
              {showReadingTime && content && (
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 font-bold">
                  <LucideIcon.Clock3 size={14} />
                  <Badge color="gray">
                    {<BlogReadingTimeCounter content={content} />}
                  </Badge>
                </div>
              )}
            </div>
          )}
          {/* SHOW CATEGORY / WORD COUNT /  READING TIME ENDS */}

          {/* SHOW TITTLE / EXCERPT / CONTENT BEGINS */}
          {(showTitle || showExcerpt || showContent || showReadMore) && (
            <div className="lg:space-y-4 space-y-2">
              {/* Title */}
              {showTitle && displayTitle && (
                <div className="">
                  <Link to={`${link}`} className="m-0">
                    <h1 className="lg:text-xl text-lg font-extrabold capitalize text-gray-800 dark:text-gray-400 first-letter:font-roboto first-letter:capitalize first-letter:text-amber-600 first-letter:font-extrabold lg:first-letter:text-2xl first-letter:text-2xl first-letter:text-extra-bold line-clamp-2">
                      {displayTitle}
                    </h1>
                  </Link>
                </div>
              )}

              {/* Excerpt */}
              {showExcerpt && displayExcerpt && (
                <div className="">
                  <p className="text-xs font-bold uppercase border w-fit py-0.5 px-1 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-400 rounded-sm shadow mb-1.5">
                    Quick Summary ↴
                  </p>
                  <div className="relative">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: displayExcerpt,
                      }}
                      className="indent-6 pt-2 text-gray-700 dark:text-gray-400"
                    />
                    <span className="absolute text-gray-700 dark:text-gray-400 top-0 left-0">
                      <FaQuoteLeft />
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              {showContent && displayContent && (
                <div className="">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: displayContent,
                    }}
                    className="text-gray-700 dark:text-gray-400 mb-2"
                  />
                </div>
              )}
            </div>
          )}
          {/* SHOW TITTLE / EXCERPT / CONTENT BEGINS */}

          {/* SHOW READ-MORE / BOOKMARK BEGINS */}
          {(showBookmark || showReadMore) && (
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center justify-between">
                {/* Book mark button */}
                {showBookmark && (
                  <div className="">
                    <BookmarkButton blogId={id} />
                  </div>
                )}

                {/* Read more button */}
                {showReadMore && (
                  <Link
                    to={`${link}`}
                    className="m-0 text-medium text-indigo-500 hover:text-indigo-900 dark:text-slate-400 font-bold hover:link"
                  >
                    Read More →
                  </Link>
                )}
              </div>
            </div>
          )}
          {/* SHOW READ-MORE / BOOKMARK ENDS */}
        </div>
      </div>
    </>
  );
};

export default RssPostCard;
