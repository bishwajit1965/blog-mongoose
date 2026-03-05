import {
  FaBookReader,
  FaClock,
  FaComment,
  FaQuoteLeft,
  FaReadme,
  FaTags,
  FaThList,
} from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";

import AuthorInfoModal from "../../components/authorInfoModal/AuthorInfoModal";
import BlogReadingTimeCounter from "../../components/blogReadingTimeCounter/BlogReadingTimeCounter";
import BookmarkButton from "../../components/bookmarkButton/BookmarkButton";
import Button from "../../components/buttons/Button";
import { Link } from "react-router-dom";
import SocialMediaLinks from "../../components/socialMediaLinks/SocialMediaLinks";
import { getComments } from "../../services/commentApiService";
import useDateFormatter from "../../hooks/useDateFormatter";

const BlogPostCard = ({ blog, user, bookmarkedAt = null }) => {
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

  const formattedDate = useDateFormatter(publishAt);
  const formattedBookmarkedDate = useDateFormatter(bookmarkedAt);
  const [fetchedComments, setFetchedComments] = useState([]);
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
    <div className="rounded-lg lg:space-y-4 space-y-2">
      {/* Blog author section begins */}
      <div className="hover:link">
        <div className="flex items-center lg:space-x-3 space-x-2 hover-target">
          <div className="">
            <AuthorInfoModal user={user} title="Bishwajit Paul" author={author}>
              <>
                <p>Email: {user?.email}</p>
                <p>Role: Admin</p>
                <p>
                  <Link
                    to="https://www.test.com"
                    className="link underline m-0"
                  >
                    I teach everything I know at
                  </Link>
                </p>
                <SocialMediaLinks />
              </>
            </AuthorInfoModal>
          </div>
        </div>
      </div>
      {/* Blog author section ends */}
      <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-8 gap-2 justify-between items-center">
        <div className="col-span-12 lg:col-span-7 lg:space-y-4 space-y-2 rounded-md min-h-[13.5rem]">
          {/* Blog title begins */}
          <div className="">
            <Link to={`/blog-details/${slug}`} className="m-0">
              <h2 className="lg:text-2xl text-xl font-extrabold capitalize text-gray-800 dark:text-base-300 first-letter:font-roboto first-letter:capitalize first-letter:text-amber-600 first-letter:font-extrabold lg:first-letter:text-4xl first-letter:text-2xl first-letter:text-extra-bold">
                {title.length > 60 ? `${title.slice(0, 60)}...` : title}
              </h2>
            </Link>
          </div>
          {/* Blog title ends */}

          {/* Blog excerpt begins */}
          <div className="">
            {excerpt ? (
              <div className="lg:min-h-[5.6rem] min-h-36">
                <div className="min-h-[44px] relative">
                  <FaQuoteLeft className="absolute top-0 text-xl text-gray-600 dark:text-gray-300" />
                  <p
                    className="absolute top-0 indent-7"
                    dangerouslySetInnerHTML={{
                      __html: excerpt ? blog.excerpt : "N/A",
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
          {/* Blog excerpt ends */}
        </div>

        <div className="col-span-12 lg:col-span-5 min-h-[13.5rem]">
          <Link to={`/blog-details/${slug}`} className="m-0">
            <img
              src={`${apiURL}${image}`}
              alt={title.slice(0, 10)}
              className="w-full object-cover min-h-[13.5rem] rounded-lg shadow-md"
            />
          </Link>
        </div>
      </div>
      <div className="lg:space-y-4 space-y-2">
        {/* Category & tags, comments & bookmark section begins */}
        <div className="lg:flex grid gap-2 items-center lg:space-x-4">
          <div className="flex items-center">
            <span className="flex items-center w-fit mr-1 py-1 lg:text-normal text-xs lg:space-x-2">
              <span>
                <FaThList className="text-xl mr-1" />
              </span>
            </span>
            <span className="">
              {category ? (
                <span className="bg-gray-200 dark:bg-gray-700 dark:text-base-300 flex items-center w-fit font-bold text-gray-600 rounded-md px-2 py-[2px] mr-1 lg:text-normal text-sm capitalize">
                  {category.name}
                </span>
              ) : (
                "N/A"
              )}
            </span>
          </div>

          {/* Tags section begins */}
          <div className="flex items-center">
            <span className="flex items-center w-fit mr-1 py-1 lg:text-normal text-xs lg:space-x-2">
              <span>
                <FaTags className="text-xl mr-1" />
              </span>
            </span>
            {tags && tags.length > 0 ? (
              tags.map((tag) => (
                <span key={tag._id}>
                  <span className="bg-gray-200 dark:bg-gray-700 dark:text-base-300 flex items-center w-fit font-bold text-gray-600 rounded-md px-2 py-[2px] mr-1 lg:text-normal text-sm capitalize">
                    {tag.name}
                  </span>
                </span>
              ))
            ) : (
              <span className="text-gray-400 dark:bg-gray-700 dark:text-base-300">
                No tags available
              </span>
            )}
          </div>

          {/* Comments & bookmarks section begins */}
          <div className="flex items-center lg:space-x-4 space-x-3">
            <div className="flex items-center lg:space-x-3 space-x-2">
              <span>
                <FaComment className="text-xl" />
              </span>
              <span className="w-6 h-6 p-1 flex items-center justify-center rounded-full border border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-base-300 shadow-sm font-semibold">
                {fetchedComments.length > 0 ? fetchedComments.length : 0}
              </span>
            </div>
            <span className="">
              <BookmarkButton blogId={_id} />
            </span>
          </div>
          {/* Comments & bookmarks section ends */}
        </div>
        {/* Category & tags, comments & bookmark  section ends */}

        {/* Author published on & bookmarked on section begins */}
        <div className="lg:flex items-center grid lg:space-x-2 space-x-0 lg:space-y-0 space-y-2">
          <div className="text-gray-500 dark:text-base-300 lg:text-normal text-sm font-bold flex items-center space-x-2">
            <span>
              <FaClock className="text-xl" />
            </span>
            <span className="text-normal">{formattedDate}</span>
          </div>
          <div className="dark:text-base-300">
            {bookmarkedAt && (
              <div className="text-gray-500 lg:text-normal text-sm font-bold flex items-center space-x-2">
                <div className="hidden lg:block">||</div>
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

        {/* Blog content begins */}
        <div className="dark:text-base-300">
          <div
            dangerouslySetInnerHTML={{
              __html:
                content.length > 345 ? `${content.slice(0, 345)}...` : content,
            }}
            className="prose max-w-none list-decimal text-gray-700 dark:text-base-300 mb-4 text-pretty"
          />
        </div>
        {/* Blog content ends */}

        {/* Read more button begins */}
        <div className="flex items-center justify-between">
          <div className="lg:text-[16px] text-sm text-gray-500 font-bold italic border border-gray-400 dark:border-gray-700 dark:text-base-300 dark:bg-gray-700 rounded-full shadow-sm lg:py-1 py-[4px] lg:px-2.5 px-1 flex items-center lg:space-x-2 space-x-1">
            <span>
              <FaReadme />
            </span>
            <span>Read in:</span>
            <span className="italic">
              {<BlogReadingTimeCounter content={content} />}
            </span>
          </div>

          <div className="">
            <Link
              to={`/blog-details/${slug}`}
              className="m-0 flex justify-center"
            >
              <Button
                label="Read More"
                icon={<FaBookReader />}
                variant="white"
                className="btn btn-sm font-bold text-[16px] text-sm rounded-lgs"
              />
            </Link>
          </div>
        </div>
        {/* Read more button ends */}
      </div>

      <div className="lg:py-10 py-5 relative">
        <div className="lg:h-[1px] h-[1px] bg-gray-200 dark:bg-gray-700 rounded-md mb- absolute flex justify-center left-2 right-2 lg:-bottom- bottom- lg:w-[90%] mx-auto">
          <p className="lg:text-base text-sm lg:visible invisible pt-1.5">
            Thank you a lot for visiting the blog site !
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
