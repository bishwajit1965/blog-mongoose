import {
  FaArrowAltCircleRight,
  FaArrowRight,
  FaBars,
  FaBookmark,
  FaClock,
  FaComment,
  FaQuoteLeft,
  FaTags,
} from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";

import BlogReadingTimeCounter from "../../components/blogReadingTimeCounter/BlogReadingTimeCounter";
import CTAButton from "../../components/buttons/CTAButton";
import { Link } from "react-router-dom";
import { getComments } from "../../services/commentApiService";
import useDateFormatter from "../../hooks/useDateFormatter";

const BlogPostCard = ({ blog, user }) => {
  const {
    // _id,
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
    <div className="lg:mb-14 mb-10 rounded-lg pb-4 bg-base-2000 relative">
      {/* Blog author section begins */}
      <div className="p-2 border-b">
        <div className="flex items-center lg:space-x-3 space-x-2">
          <div className="">
            {user ? (
              <img
                src={user?.photoURL}
                alt={title.slice(0, 15)}
                className="w-10 rounded-full"
              />
            ) : (
              <img
                src="https://i.ibb.co.com/1z7P2wJ/girl2.jpg"
                alt=""
                className="w-10 rounded-full"
              />
            )}
          </div>
          <div className="">
            <p className="text-gray-500 lg:text-base text-sm flex items-center font-bold space-x-2">
              <span>Author:</span> <span>{author.name}</span>
            </p>
          </div>
        </div>
      </div>
      {/* Blog author section ends */}

      <div className="grid lg:grid-cols-12 grid-cols-1 gap-2 justify-between items-center p-2">
        <div className="col-span-12 lg:col-span-8 lg:space-y-4 space-y-2 rounded-md min-h-[13rem]">
          {/* Blog title begins */}
          <div className="">
            {/* <p>{_id}</p> */}
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
              <div className="lg:min-h-28 min-h-44 rounded-lg p-3 border-l-4 border-teal-600">
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
        <div className="lg:flex grid gap-2 items-center">
          <div className="flex items-center">
            <span className="flex items-center w-fit font-bold bg-gray-500 text-white rounded-md mr-2 py-1 lg:text-normal text-xs px-2 space-x-2">
              <span>
                <FaBars className="" />
              </span>
              <span>Category</span>
              <span>
                <FaArrowAltCircleRight />
              </span>
            </span>
            <span className="">
              {category ? (
                <span className="bg-gray-200 flex items-center w-fit font-bold text-gray-600 rounded-md px-2 py-1 mr-2 lg:text-normal text-xs capitalize">
                  {category.name}
                </span>
              ) : (
                "N/A"
              )}
            </span>
          </div>

          {/* Tags section begins */}
          <div className="flex items-center">
            <span className="flex items-center w-fit font-bold bg-gray-500 text-white  rounded-md mr-2 py-1 lg:text-normal text-xs px-2 space-x-2">
              <span>
                <FaTags className="" />
              </span>
              <span>Tags</span>

              <span>
                <FaArrowAltCircleRight />
              </span>
            </span>
            {tags && tags.length > 0 ? (
              tags.map((tag) => (
                <span key={tag._id}>
                  <span className="bg-gray-200 flex items-center w-fit font-bold text-gray-800  rounded-md px-2 py-1 mr-2 lg:text-normal text-xs">
                    {tag.name}
                  </span>
                </span>
              ))
            ) : (
              <span className="text-gray-400">No tags available</span>
            )}
          </div>

          {/* Comments & bookmarks section begins */}
          <div className="flex items-center lg:space-x-2 space-x-1">
            <span>
              <FaComment />
            </span>
            <span className="w-6 h-6 p-1 flex items-center justify-center rounded-full bg-gray-200 shadow-sm font-semibold">
              {fetchedComments.length > 0 ? fetchedComments.length : 0}
            </span>
            <span className="">
              <FaBookmark />
            </span>
          </div>
          {/* Comments & bookmarks section ends */}
        </div>
        {/* Category & tags, comments & bookmark  section ends */}

        {/* Author published at section begins */}
        <div className="lg:flex grid items-center lg:space-x-2">
          <div className="">
            <p className="text-gray-500 lg:text-normal text-sm font-bold flex items-center space-x-2">
              <span className="">Published on:</span> <FaClock className="" />
              <span>{formattedDate}</span>
            </p>
          </div>
        </div>
        {/* Author published at section ends */}

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
          <div className="lg:text-lg text-sm text-gray-500 font-bold italic border border-gray-400 rounded-md shadow-sm lg:p-2 p-1 flex items-center lg:space-x-2">
            <span>Reading time:</span>
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
                icon={<FaArrowRight />}
                variant="primary"
                className="btn lg:text-normal lg:text-lg lg:btn-md text-sm btn-sm rounded-lg"
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
