import {
  FaClock,
  FaComment,
  FaFileWord,
  FaQuoteLeft,
  FaQuoteRight,
  FaTags,
  FaThList,
} from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";

import AuthorInfoModal from "../../components/authorInfoModal/AuthorInfoModal";
import BlogReadingTimeCounter from "../../components/blogReadingTimeCounter/BlogReadingTimeCounter";
import BookmarkButton from "../../components/bookmarkButton/BookmarkButton";
import { Link } from "react-router-dom";
import SocialMediaLinks from "../../components/socialMediaLinks/SocialMediaLinks";
import { getComments } from "../../services/commentApiService";
import useDateFormatter from "../../hooks/useDateFormatter";
import { motion } from "framer-motion";
import { LucideIcon } from "../../components/lucideIcon/LucideIcons";
import useWordCount from "../../admin/adminHooks/useWordCount";
import Badge from "../../admin/ui/Badge";

const BlogPostCard = ({
  blog,
  user,
  bookmarkedAt = null,

  // Required
  showAuthorAvatar = true,
  showBlogPostImage = true,
  showAuthor = true,
  showWordCount = true,
  showReadingTime = true,
  showTitle = true,
  showExcerpt = true,
  showReadMore = true,

  // Optional features
  showContent = false,
  showAuthorInfoModal = false,
  showComments = false,
  showBookmark = false,
  showPublishDate = false,
  showSocialLinks = false,
  showCategory = false,
  showTags = false,

  // Optional limits
  titleLimit = 60,
  excerptLimit = 225,
  contentLimit = 455,
  tagLimit = 2,
}) => {
  const {
    _id,
    title,
    slug,
    author,
    content,
    category,
    tags,
    publishAt,
    excerpt,
    image,
  } = blog || {};

  /** =========================================
  |   HELPERS
  | *========================================== */
  const formattedDate = useDateFormatter(publishAt);

  const formattedBookmarkedDate = useDateFormatter(bookmarkedAt);

  const [fetchedComments, setFetchedComments] = useState([]);

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

  const blogPostImage = image?.url || "";

  const visibleTags = tags?.slice(0, tagLimit) || [];

  const wordCount = useWordCount(content);

  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-xl lg:space-y-4 space-y-2 overflow-x-clip lg:p-6 p-4 lg:border-0 border border-base-content/15 bg-white dark:bg-gray-800 shadow-lg dark:shadow-sm"
    >
      {/*==============================================================================
       |* BLOG AUTHOR INFO MODAL / SOCIAL LINKS / AUTHOR AVATAR / AUTHOR NAME / PUBLISH DATE / BLOG WORD COUNT / READING TIME / CATEGORY SECTION
       |*===========================================================================*/}

      {/* Blog author section begins */}
      <div className="border-b dark:border-gray-700 pb-2">
        {(showAuthorAvatar ||
          showAuthorInfoModal ||
          showSocialLinks ||
          showWordCount ||
          showPublishDate ||
          showReadingTime ||
          showCategory) && (
          <div className="flex flex-wrap gap-2 items-center lg:space-x-3 space-x-0 hover-target">
            {showAuthorInfoModal ? (
              <AuthorInfoModal
                user={user}
                title={blog?.author?.name}
                author={author}
                blog={blog}
              >
                <div className="space-y-2">
                  <p className="flex items-center gap-1.5 font-bold">
                    <LucideIcon.CreditCard size={18} />
                    {author?.roles?.map((r) => (
                      <span key={r?._id} className="capitalize">
                        {r?.name}
                      </span>
                    ))}
                  </p>

                  <p className="flex items-center text-sm gap-1.5">
                    <LucideIcon.Mail size={18} /> {author?.email}
                  </p>

                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm">
                      Followers: {author.followers?.length || 0}
                    </p>

                    <p className="text-sm">
                      Following: {author.following?.length || 0}
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
                    className="h-8 w-8 rounded-full object-cover bg-gray-300 p-0.5 shadow"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
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

            {showPublishDate && (
              <div className="text-gray-500 dark:text-gray-400 lg:text-normal text-sm font-bold flex items-center space-x-2">
                <span>
                  <FaClock size={14} />
                </span>
                <span className="text-normal">{formattedDate}</span>
              </div>
            )}

            {/* Category section begins */}
            {showCategory && (
              <div className="flex items-center gap-1">
                <span className="flex items-center gap-2">
                  <span>
                    <FaThList size={14} />
                  </span>
                </span>
                <span className="">
                  {category ? (
                    <Badge color="blue">{category?.name}</Badge>
                  ) : (
                    "N/A"
                  )}
                </span>
              </div>
            )}
            {/* Category section ends */}

            {showWordCount && wordCount && (
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 font-bold">
                <FaFileWord size={14} />
                <Badge color="gray">{wordCount} words</Badge>
              </div>
            )}

            {showReadingTime && (
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 font-bold">
                <LucideIcon.Clock3 size={14} />
                <Badge color="gray">
                  {<BlogReadingTimeCounter content={content} />}
                </Badge>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Blog author section ends */}

      {/*==================================================
       |*  BOOKMARKED AT SECTION
       |*===============================================*/}
      {bookmarkedAt && (
        <div className="lg:space-y-4 space-y-4">
          {/* Author published on & bookmarked on section begins */}
          <div className="lg:flex items-center grid lg:space-x-2 space-x-0 lg:space-y-0 space-y-2">
            <div className="dark:text-base-300">
              {bookmarkedAt && (
                <div className="text-gray-500 lg:text-normal text-sm font-bold flex items-center space-x-2">
                  <span className="">Bookmarked on:</span>
                  <span>
                    <FaClock />
                  </span>
                  <span>{formattedBookmarkedDate}</span>
                </div>
              )}
            </div>
          </div>
          {/* Author published on & bookmarked on section ends */}
        </div>
      )}

      {/*====================================================
       |* BLOG TITLE / EXCERPT / BLOG IMAGE / CONTENT SECTION
       |*=================================================*/}
      <div className="lg:grid flex flex-col-reverse lg:grid-cols-12 grid-cols-1 lg:gap-4 gap-2 justify-between items-center">
        {/* =====> LEFT SIDE BLOG DETAILS COLUMN STARTS (col-span-7) =====> */}
        {(showTitle ||
          showBlogPostImage ||
          showExcerpt ||
          showBlogPostImage) && (
          <div className="col-span-12 lg:col-span-7 lg:space-y-5 space-y-3 rounded-md">
            {/* Blog title begins */}
            {showTitle && (
              <div className="mt-0">
                <Link to={`/blog-details/${slug}`} className="m-0">
                  <h2 className="lg:text-xl text-lg font-extrabold capitalize text-gray-800 dark:text-gray-400 first-letter:font-roboto first-letter:capitalize first-letter:text-amber-600 first-letter:font-extrabold lg:first-letter:text-2xl first-letter:text-3xl first-letter:text-extra-bold line-clamp-2">
                    {displayTitle}
                  </h2>
                </Link>
              </div>
            )}
            {/* Blog title ends */}

            {/* Blog excerpt begins */}
            {showExcerpt && (
              <div className="">
                <h2 className="text-xs font-bold uppercase mb-2 border w-fit py-0.5 px-1 border-gray-300 dark:border-gray-700 rounded-sm shadow">
                  Quick Summary ↴
                </h2>
                {excerpt ? (
                  <div className="lg:min-h-[5.75rem] min-h-[13rem]">
                    <div className="relative">
                      <FaQuoteLeft
                        size={20}
                        className="absolute top-0 text-xl text-gray-600 dark:text-gray-300 pb-1"
                      />
                      <p
                        className="absolute top-0 indent-6 dark:text-gray-400 italic text-prose text-pretty"
                        dangerouslySetInnerHTML={{
                          __html: displayExcerpt,
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
            )}
            {/* Blog excerpt ends */}
          </div>
        )}

        {/* ====> RIGHT SIDE IMAGE COLUMN STARTS (col-span-5) ====> */}

        {/* Blog image begins */}
        {showBlogPostImage && blogPostImage && (
          <div className="col-span-12 lg:col-span-5 flex items-center">
            {blogPostImage && (
              <Link to={`/blog-details/${slug}`} className="lg:m-auto m-0">
                <img
                  src={blogPostImage ? blogPostImage : `${apiURL}${image}`}
                  alt={title?.slice(0, 10)}
                  className="w-full lg:object-cover h-auto rounded-lg shadow-md border border-base-content/15 dark:border-gray-700 transition-all hover:scale-105"
                />
              </Link>
            )}
          </div>
        )}
        {/* Blog image ends */}
      </div>

      {/*======================================
       |* BLOG CONTENT SECTION BEGINS
       |*===================================*/}
      {/* Blog content begins */}
      {showContent && (
        <div className="dark:text-base-300 lg:py-4 py-2">
          <div
            dangerouslySetInnerHTML={{
              __html: displayContent,
            }}
            className="prose max-w-none list-decimal text-gray-700 dark:text-gray-400 mb-4 text-pretty"
          />
        </div>
      )}
      {/* Blog content ends */}

      {/*=======================================
       |* TAGS / COMMENTS  BUTTON SECTION
       |*====================================*/}
      {/* Read more button begins */}
      {(showTags || showComments || showBookmark || showReadMore) && (
        <div className="flex flex-wrap items-center justify-between lg:pt-5">
          {/* Tags section begins */}
          {showTags && visibleTags && (
            <div className="flex items-center gap-1">
              <span className="flex items-center gap-2">
                <span>
                  <FaTags size={14} />
                </span>
              </span>
              {visibleTags?.length > 0 ? (
                visibleTags.map((tag) => (
                  <Badge key={tag?._id} color="gray">
                    <span className="flex items-center">{tag?.name}</span>
                  </Badge>
                ))
              ) : (
                <span className="text-gray-400 dark:bg-gray-800 dark:text-gray-400">
                  No tags available
                </span>
              )}
              {tags?.length > tagLimit && <span>...</span>}
            </div>
          )}
          {/* Tags section ends */}

          {/* Comments section begins */}
          {showComments && fetchedComments && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span>
                  <FaComment size={14} />
                </span>
                <span className="w-4 h-4 p-1 text-xs flex items-center justify-center rounded-full border border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 shadow-sm font-semibold">
                  {fetchedComments?.length > 0 ? fetchedComments?.length : 0}
                </span>
              </div>
            </div>
          )}

          {/*  Bookmark section begins */}
          {showBookmark && (
            <div className="">
              <span className="">
                <BookmarkButton blogId={_id} />
              </span>
            </div>
          )}
          {/* Bookmark section ends */}

          {/* Read more button begins */}
          {showReadMore && (
            <Link
              to={`/blog-details/${slug}`}
              className="m-0 text-medium text-indigo-500 hover:text-indigo-900 dark:text-slate-400 font-bold hover:link"
            >
              Read More →
            </Link>
          )}
          {/* Read more button ends */}
        </div>
      )}

      {/*==================================================
       |*  FOOTER & GREETINGS SECTION
       |*===============================================*/}
      <div className="lg:py-8 lg:my-14 relative lg:block hidden">
        <div className="lg:h-[1px] border-b border-base-content/15 dark:border-gray-700 rounded-md absolute flex justify-center left-2 right-2 lg:w-[90%] mx-auto">
          <p className="lg:text-base text-sm pt-1.5 flex gap-2">
            <FaQuoteLeft className="text-gray-400" /> Thanks a lot from
            <span className="font-extrabold">Nova Journal</span> for your
            interest on the topic ! Keep reading !
            <FaQuoteRight className="text-gray-400" />
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPostCard;
