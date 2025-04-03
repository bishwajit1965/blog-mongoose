import {
  FaClock,
  FaExchangeAlt,
  FaExpandArrowsAlt,
  FaLayerGroup,
  FaPlusCircle,
  FaQuoteLeft,
  FaTags,
} from "react-icons/fa";

import AdminLoader from "../../adminComponent/adminLoader/AdminLoader";
import CTAButton from "../../../components/buttons/CTAButton";
import { Helmet } from "react-helmet-async";
import useAdminUser from "../../adminHooks/useAdminUser";
import useWordCount from "../../adminHooks/useWordCount";

const BlogDetailsView = ({ blog, manageBlog, toggler, isHidden }) => {
  const { users } = useAdminUser();
  const wordCount = useWordCount(blog.content);
  if (!blog) {
    return <AdminLoader />;
  }

  const seoTitle = blog.metaTitle || blog.title.substring(0, 60);
  const seoDescription = blog.metaDescription || blog.content.substring(0, 160);
  const seoKeywords =
    blog.metaKeywords || blog.title.toLowerCase().split(" ").slice(0, 10);
  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const author = users.find((user) => user._id === blog.author._id);

  // International date time format without any library
  const formattedDate = new Intl.DateTimeFormat("en-GB").format(
    new Date(blog.publishAt)
  );
  const getRelativeTime = (date) => {
    const diff = Math.floor(
      (new Date() - new Date(date)) / (1000 * 60 * 60 * 24)
    );
    return diff === 0 ? "Today" : `${diff} days ago`;
  };

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords.join(", ")} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`${apiURL}${blog.image}`} />
        <meta property="og:url" content={`${apiURL}/blogs/${blog._id}`} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={`${apiURL}${blog.image}`} />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {`
          {
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            "headline": "${seoTitle}",
            "description": "${seoDescription}",
            "image": "${apiURL + blog.image}",
            "author": {
              "@type": "Person",
              "name": "${author ? author.name : "Unknown"}"
            },
            "datePublished": "${blog.publishAt}",
            "articleBody": "${blog.content}"
          }
          `}
        </script>
      </Helmet>

      <div className="lg:space-y-3 shadow-md rounded-lg p-2 mb-2">
        <img
          src={`${apiURL}${blog.image}`}
          alt={blog.title}
          className={`${
            isHidden ? "h-96" : "h-60"
          } w-full  object-cover rounded-md shadow-sm mb-2`}
          loading="lazy" // Lazy load the image
        />
        <h1
          className={`${
            !isHidden
              ? "text-xl font-bold text-gray-600 first-letter:text-gray-600 first-letter:capitalize"
              : "first-letter:font-roboto first-letter:capitalize first-letter:text-amber-500 first-letter:italic first-letter:font-extrabold first-letter:text-5xl"
          } text-xl font-bold text-gray-600`}
        >
          {blog.title}
        </h1>

        {/* Author Section */}
        <div className="flex items-center space-x-2">
          <span>
            {author ? (
              <img
                src={author.avatar}
                alt={author.name || "Unknown"}
                className="w-10 rounded-full border"
              />
            ) : (
              <p className="font-bold">{author ? author.name : "Unknown"}</p>
            )}
          </span>
          <span className="text-gray-400 font-bold">
            {blog?.author ? blog?.author.name : "N/A"}
          </span>
        </div>

        {blog?.excerpt ? (
          <div className="p-2">
            <div
              className={`${
                isHidden ? "min-h-[40px]" : "min-h-[90px]"
              } relative mt-[5px]`}
            >
              <FaQuoteLeft className="absolute top-0 text-xl text-gray-600 dark:text-gray-300" />

              <p
                className="absolute top-0 indent-7"
                dangerouslySetInnerHTML={{
                  __html: blog?.excerpt ? blog.excerpt : "N/A",
                }}
              />
            </div>
          </div>
        ) : (
          <p className="text-red-500 text-xl font-bold">
            😃 No summary is available for this blog post now! ⌚
          </p>
        )}
        <div
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className="prose max-w-none list-decimal"
        />
        {/* <p>{blog.content}</p> */}
        <div className="flex items-center">
          <span className="flex items-center w-fit font-bold bg-gray-300 shadow-sm text-gray-900 rounded-md mr-2 text-xs px-2 py-1">
            <FaLayerGroup className="mr-1" /> Category :
          </span>
          <span className="bg-gray-200 w-fit flex items-center font-bold text-gray-600 shadow-sm rounded-md mr-2 text-xs px-2 py-1">
            {blog.category ? blog.category.name : "Category not available"}
          </span>
        </div>
        <div className="flex items-center">
          <span className="flex items-center w-fit font-bold bg-gray-300 shadow-sm text-gray-900 rounded-md mr-2 text-xs px-2 py-1">
            <FaTags className="mr-1" /> Tags :
          </span>

          {blog.tags && blog.tags.length > 0 ? (
            blog.tags.map((tag) => (
              <span key={tag._id}>
                <span className="bg-gray-200 flex items-center w-fit font-bold text-gray-600 shadow-sm rounded-md px-2 py-1 mr-2 text-xs">
                  {tag.name}
                </span>
              </span>
            ))
          ) : (
            <span className="text-gray-400">No tags available</span>
          )}
        </div>
        <div className="flex items-center">
          <span className="flex items-center w-fit font-bold bg-gray-300 shadow-sm text-gray-900 rounded-md mr-2 text-xs px-2 py-1">
            <FaClock className="mr-1" /> Published on :
          </span>
          <span className="bg-gray-200 flex items-center w-fit font-bold text-gray-600 shadow-sm rounded-md px-2 py-1 mr-2 text-xs">
            {formattedDate}
            {", "} ({getRelativeTime(blog.publishAt)})
          </span>
        </div>
        <div className="flex items-center">
          <span className="flex items-center w-fit font-bold bg-gray-300 shadow-sm text-gray-900 rounded-md mr-2 text-xs px-2 py-1">
            <FaClock className="mr-1" /> Blog status :
          </span>
          <span className="bg-gray-200 flex items-center w-fit font-bold text-gray-600 shadow-sm rounded-md px-2 py-1 mr-2 text-xs">
            {blog.status}
          </span>
        </div>
        <div className="my-2">
          <p className="text-xl font-bold">
            <span className="">Blog word count: &nbsp;</span>
            {wordCount}
          </p>
        </div>
        <div className="flex space-x-4">
          {!isHidden && (
            <CTAButton
              onClick={() => manageBlog()}
              label="Go to Create Blog Page"
              icon={<FaPlusCircle />}
              className="m-0 p-2 btn btn-sm"
              variant="primary"
            />
          )}
          <CTAButton
            onClick={() => toggler()}
            label={isHidden ? "Reverse View" : "Expand View"}
            icon={!isHidden ? <FaExpandArrowsAlt /> : <FaExchangeAlt />}
            className="m-0 p-2 btn btn-sm invisible lg:visible "
            variant="primary"
          />
        </div>
      </div>
    </>
  );
};

export default BlogDetailsView;
