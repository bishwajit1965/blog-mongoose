import { FaBloggerB, FaClock, FaLayerGroup, FaTags } from "react-icons/fa";

import AdminLoader from "../../adminComponent/adminLoader/AdminLoader";
import CTAButton from "../../../components/buttons/CTAButton";
import { Helmet } from "react-helmet-async";
import useAdminUser from "../../adminHooks/useAdminUser";

const BlogDetailsView = ({ blog }) => {
  const { users } = useAdminUser();
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

      <div className="lg:space-y-3 shadow-md pb-2 rounded-lg p-2">
        <img
          src={`${apiURL}${blog.image}`}
          alt={blog.title}
          className="w-full h-60 object-cover rounded-md shadow-sm mb-2"
          loading="lazy" // Lazy load the image
        />
        <h1 className="text-xl font-bold text-gray-600">{blog.title}</h1>
        <p className="font-bold"></p>

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

        <p>{blog.content}</p>
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
        <div className="">
          <CTAButton
            label="Go to Blogs Page"
            icon={<FaBloggerB />}
            href="manage-blogs"
            className="m-0 p-2 w-full btn btn-sm"
            variant="primary"
          />
        </div>
      </div>
    </>
  );
};

export default BlogDetailsView;
