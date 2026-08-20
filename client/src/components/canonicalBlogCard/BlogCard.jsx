import {
  FaCommentDots,
  FaFileWord,
  FaList,
  FaQuoteLeft,
  FaTags,
} from "react-icons/fa";
import Badge from "../../admin/ui/Badge";
import { LucideIcon } from "../../components/lucideIcon/LucideIcons";
import useDateFormatter from "../../hooks/useDateFormatter";
import BlogReadingTimeCounter from "../blogReadingTimeCounter/BlogReadingTimeCounter";
import { useCallback, useEffect, useState } from "react";
import { getComments } from "../../services/commentApiService";
import BookmarkButton from "../bookmarkButton/BookmarkButton";
import AuthorInfoModal from "../authorInfoModal/AuthorInfoModal";
import SocialMediaLinks from "../socialMediaLinks/SocialMediaLinks";
import { Link } from "react-router-dom";
import useWordCount from "../../admin/adminHooks/useWordCount";

const BlogCard = ({
  post,
  user,

  // Used features
  showCategory = true,
  showAuthor = true,
  showAuthorAvatar = true,
  showDate = true,
  showTitle = true,
  showReadingTime = true,
  showReadMore = true,
  showExcerpt = true,
  showWordCount = true,

  // Optional features
  authorInfoModal = false,
  showContent = false,
  showTags = false,
  showComments = false,
  showBookmark = false,
  showSocialLinks = false,

  // Optional limits
  titleLimit = 60,
  excerptLimit = 150,
  contentLimit = 150,
  tagLimit = 2,
}) => {
  const {
    _id,
    author,
    tags,
    title,
    category,
    slug,
    content,
    excerpt,
    image,
    publishAt,
  } = post || {};

  /** =========================================
  |   HELPERS
  | *========================================== */
  const imageUrl = image?.url || image;

  const displayTitle =
    title?.length > titleLimit ? `${title.slice(0, titleLimit)}...` : title;

  const displayExcerpt =
    excerpt?.length > excerptLimit
      ? `${excerpt.slice(0, excerptLimit)}...`
      : excerpt;

  const displayContent =
    content?.length > contentLimit
      ? `${content.slice(0, contentLimit)}...`
      : content;

  const visibleTags = tags?.slice(0, tagLimit);

  const wordCount = useWordCount(content);

  const [fetchedComments, setFetchedComments] = useState([]);

  const formattedDate = useDateFormatter(publishAt);

  /**==========================================
   * FETCH COMMENTS LIST
   *===========================================*/
  const fetchCommentsList = useCallback(async () => {
    const commentData = await getComments(slug);
    if (commentData) {
      setFetchedComments(commentData);
    }
  }, [slug]);

  useEffect(() => {
    fetchCommentsList();
  }, [fetchCommentsList]);

  return (
    <article className="h-full flex flex-col overflow-hidden rounded-xl border border-base-content/15 transition-shadow duration-300 dark:border-gray-700 lg:min-h-[79vh] min-h-[40rem] relative bg-white dark:bg-gray-800 shadow-lg dark:shadow-sm">
      {/*============================================
      | BLOG IMAGE
      |*=============================================*/}
      <Link to={`/blog-details/${slug}`} className="m-0">
        {image && (
          <img
            src={imageUrl}
            alt={title || "Blog post"}
            className="w-full h-52 aspect-video object-cover border-b dark:border-white/10 shadow"
          />
        )}
      </Link>

      {/*============================================
      | AUTHOR / PUBLISH DATE RELATED INFO
      |*=============================================*/}
      <div className="flex flex-1 flex-col lg:p-6 p-4 lg:space-y-4 space-y-2">
        {(authorInfoModal ||
          showSocialLinks ||
          showAuthorAvatar ||
          showAuthor ||
          showDate ||
          showReadingTime) && (
          <div className="flex flex-wrap items-center justify-between gap-2">
            {authorInfoModal ? (
              <AuthorInfoModal
                user={user}
                blog={post}
                author={author}
                title="User"
              >
                <div className="space-y-2">
                  <p className="flex items-center gap-1.5 font-bold capitalize">
                    <LucideIcon.CreditCard size={14} />
                    {author?.roles?.map((r) => (
                      <span key={r?._id}>{r?.name}</span>
                    ))}
                  </p>

                  <p className="flex items-center text-sm gap-1.5">
                    <LucideIcon.Mail size={14} /> {author?.email}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm">
                      Followers: {author?.followers?.length || 0}
                    </p>

                    <p className="text-sm">
                      Following: {author?.following?.length || 0}
                    </p>
                  </div>

                  <Link
                    target="_blank"
                    to="https://portfolio-h5k5.vercel.app"
                    className="m-0 hover:link text-blue-400 flex items-center gap-1.5"
                  >
                    <LucideIcon.Briefcase size={16} /> My Portfolio Link
                  </Link>
                  {showSocialLinks && <SocialMediaLinks />}
                </div>
              </AuthorInfoModal>
            ) : (
              <div className="flex items-center gap-2">
                {showAuthorAvatar && author?.avatar ? (
                  <img
                    src={author.avatar}
                    alt={author?.name || "Author"}
                    className="h-10 w-10 rounded-full object-cover bg-gray-300 p-0.5 shadow"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                )}

                {showAuthor && author?.name && (
                  <div className="">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {author?.name}
                    </p>
                  </div>
                )}
              </div>
            )}

            {showDate && publishAt && (
              <div className="min-w-0">
                {publishAt && (
                  <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <LucideIcon.CalendarDays size={13} />
                    {formattedDate}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* =========================================
        | CATEGORY / TAG / WORD COUNT  RELATED INFO
        |* =======================================*/}
        {(showCategory || showTags || showWordCount || showReadingTime) && (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <FaList size={14} />{" "}
              {showCategory && category?.name && (
                <Badge color="blue">
                  <span className="flex items-center">{category.name}</span>
                </Badge>
              )}
            </div>

            {showTags && visibleTags && (
              <div className="flex items-center gap-1">
                <FaTags size={14} />
                {showTags &&
                  visibleTags?.map((tag) => (
                    <Badge key={tag?._id} color="gray">
                      <span className="flex items-center">{tag?.name}</span>
                    </Badge>
                  ))}
                {tags?.length > 2 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ...
                  </span>
                )}
              </div>
            )}

            {showWordCount && wordCount && (
              <div className="flex items-center gap-1">
                <FaFileWord size={14} />
                <Badge color="gray">{wordCount} words</Badge>
              </div>
            )}

            {showReadingTime && (
              <div className="flex items-center gap-1">
                <LucideIcon.Clock3 size={14} />
                <Badge color="gray">
                  <BlogReadingTimeCounter content={content} />
                </Badge>
              </div>
            )}
          </div>
        )}

        {/* =========================================
        | COMMENTS & BOOKMARK RELATED DATA
        |* ==========================================*/}
        {(showComments || showBookmark) && (
          <div className="flex items-center lg:space-x-4 space-x-2">
            {showComments && (
              <div className="flex items-center lg:space-x-2 space-x-2">
                <span>
                  <FaCommentDots size={18} className="text-xl" />
                </span>
                <span className="w-5 h-5 p-1 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-700 bg-gray-200 text-xs shadow font-semibold">
                  {showComments && fetchedComments.length > 0
                    ? fetchedComments.length
                    : 0}
                </span>
              </div>
            )}
          </div>
        )}

        {/* =========================================
        | TITLE, EXCERPT & CONTENT RELATED INFO
        |* ==========================================*/}
        <div className="lg:space-y-4 space-y-3">
          {(showTitle || showExcerpt || showContent) && (
            <>
              {/* Title */}
              {showTitle && displayTitle && (
                <Link to={`/blog-details/${slug}`} className="m-0">
                  <h2 className="lg:text-xl text-lg font-extrabold capitalize text-gray-800 dark:text-gray-400 first-letter:font-roboto first-letter:capitalize first-letter:text-amber-600 first-letter:font-extrabold lg:first-letter:text-2xl first-letter:text-2xl first-letter:text-extra-bold line-clamp-2 m-0 p-0">
                    {displayTitle}
                  </h2>
                </Link>
              )}

              {/* Excerpt */}
              {showExcerpt && displayExcerpt && (
                <div className="">
                  <h2 className="text-xs font-bold uppercase mb-2 border w-fit py-0.5 px-1 border-gray-300 dark:border-gray-700 rounded-sm">
                    Quick Summary ↴
                  </h2>
                  <div className="relative">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: displayExcerpt,
                      }}
                      className={`${!showExcerpt && displayExcerpt ? "hidden" : "indent-6 text-left line-clamp-3 text-sms leading-relaxed text-gray-600 dark:text-gray-400 pt-1 italic"}`}
                    />
                    <span className="absolute text-gray-600 dark:text-gray-400 top-0 left-0">
                      <FaQuoteLeft />
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              {showContent && displayContent && (
                <p
                  dangerouslySetInnerHTML={{
                    __html: displayContent,
                  }}
                  className={`${showContent && content ? "line-clamp-4" : "line-clamp-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400"}`}
                />
              )}
            </>
          )}
        </div>

        {/*==============================================
        | FOOTER AREA (Reading timer & Read More Button)
        |*============================================*/}
        {(showBookmark || showReadMore) && (
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {showBookmark && (
                <div className="">
                  <BookmarkButton blogId={_id} />
                </div>
              )}

              {showReadMore && (
                <div className="">
                  <Link
                    to={`/blog-details/${slug}`}
                    className="m-0 text-medium text-indigo-500 hover:text-indigo-900 dark:text-slate-400 font-bold hover:link"
                  >
                    Read More →
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogCard;
