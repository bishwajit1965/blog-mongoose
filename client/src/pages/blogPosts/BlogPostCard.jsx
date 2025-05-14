import {
  FaBook,
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
import CTAButton from "../../components/buttons/CTAButton";
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
    <div className="lg:mb-14 mb-10 rounded-lg pb-4 relative">
      {/* Blog author section begins */}
      <div className="p-2 border-b hover:link">
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
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-2 justify-between items-center p-2">
        <div className="col-span-12 lg:col-span-8 lg:space-y-4 space-y-2 rounded-md min-h-[13rem]">
          {/* Blog title begins */}
          <div className="">
            <p>{_id}</p>
            <Link to={`/blog-details/${slug}`} className="m-0">
              <h2 className="lg:text-2xl text-xl font-extrabold text-gray-800 first-letter:font-roboto first-letter:capitalize first-letter:text-amber-600 first-letter:font-extrabold lg:first-letter:text-5xl first-letter:text-2xl first-letter:text-extra-bold">
                {title.length > 60 ? `${title.slice(0, 60)}...` : title}
              </h2>
            </Link>
          </div>
          {/* Blog title ends */}

          {/* Blog excerpt begins */}
          <div className="">
            {excerpt ? (
              <div className="lg:min-h-28 min-h-44">
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
        <div className="col-span-12 lg:col-span-4 min-h-[13rem]">
          <Link to={`/blog-details/${slug}`} className="m-0">
            <img
              src={`${apiURL}${image}`}
              alt={title.slice(0, 10)}
              className="w-full object-cover min-h-[13rem] rounded-lg shadow-md"
            />
          </Link>
        </div>
      </div>
      <div className="lg:p-4 p-2 lg:space-y-4 space-y-2">
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
                <span className="bg-gray-200 flex items-center w-fit font-bold text-gray-600 rounded-md px-2 py-[2px] mr-1 lg:text-normal text-sm capitalize">
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
                  <span className="bg-gray-200 flex items-center w-fit font-bold text-gray-600 rounded-md px-2 py-[2px] mr-1 lg:text-normal text-sm capitalize">
                    {tag.name}
                  </span>
                </span>
              ))
            ) : (
              <span className="text-gray-400">No tags available</span>
            )}
          </div>

          {/* Comments & bookmarks section begins */}
          <div className="flex items-center lg:space-x-4 space-x-3">
            <div className="flex items-center lg:space-x-3 space-x-2">
              <span>
                <FaComment className="text-xl" />
              </span>
              <span className="w-6 h-6 p-1 flex items-center justify-center rounded-full border border-gray-300 bg-gray-200 shadow-sm font-semibold">
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
          <div className="text-gray-500 lg:text-normal text-sm font-bold flex items-center space-x-2">
            <span className="">Published on:</span>
            <span>
              <FaClock className="text-xl" />
            </span>
            <span className="text-normal">{formattedDate}</span>
          </div>
          <div className="">
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
        <div className="">
          <div
            dangerouslySetInnerHTML={{
              __html:
                content.length > 300 ? `${content.slice(0, 300)}...` : content,
            }}
            className="prose indent-7 max-w-none list-decimal text-gray-700 mb-4 text-pretty"
          />
        </div>
        {/* Blog content ends */}

        {/* Read more button begins */}
        <div className="flex items-center justify-between">
          <div className="lg:text-[16px] text-sm text-gray-500 font-bold italic border border-gray-400 rounded-md shadow-sm lg:py-1 py-[4px] lg:px-2 px-1 flex items-center lg:space-x-2 space-x-1">
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
              <CTAButton
                label="Read More"
                icon={<FaBook />}
                variant="primary"
                className="btn btn-sm font-bold text-[16px] text-sm rounded-lg"
              />
            </Link>
          </div>
        </div>
        {/* Read more button ends */}
      </div>
      <div className="">
        <div className="lg:h-[2px] h-[1px] bg-gray-300 rounded-md mb-4 absolute flex justify-center left-4 right-4 lg:-bottom-4 -bottom-2 lg:w-9/12 mx-auto">
          <p className="lg:text-base text-sm">
            Thank you a lot for visiting the blog site !
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
