import { FaBloggerB, FaLayerGroup, FaTags } from "react-icons/fa";

import CTAButton from "../../../components/buttons/CTAButton";

const BlogDetailsView = ({ blog }) => {
  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // International date time format without any library
  const formattedDate = new Intl.DateTimeFormat("en-GB").format(
    new Date(blog.publishedAt)
  );
  const getRelativeTime = (date) => {
    const diff = Math.floor(
      (new Date() - new Date(date)) / (1000 * 60 * 60 * 24)
    );
    return diff === 0 ? "Today" : `${diff} days ago`;
  };

  return (
    <div className="lg:space-y-3">
      <img
        src={`${apiURL}${blog.image}`}
        alt={blog.title}
        className="w-full h-60 object-cover rounded-md shadow-sm mb-2"
      />
      <h1 className="text-xl font-bold text-gray-600">{blog.title}</h1>
      <p>{blog.content}</p>
      <div className="flex items-center">
        <span className="flex items-center w-fit font-bold bg-gray-300 shadow-sm text-gray-900 rounded-md mr-2 px-2 py-1">
          <FaLayerGroup className="mr-1" /> Category :
        </span>
        <span className="bg-gray-200 w-fit flex items-center font-bold text-gray-600 shadow-sm rounded-md mr-2 px-2 py-1">
          {blog.category.name}
        </span>
      </div>
      <div className="flex items-center">
        <span className="flex items-center w-fit font-bold bg-gray-300 shadow-sm text-gray-900 rounded-md mr-2 px-2 py-1">
          <FaTags className="mr-1" /> Tags :
        </span>

        {blog.tags.map((tag) => (
          <span key={tag._id}>
            <span className="bg-gray-200 flex items-center w-fit font-bold text-gray-600 shadow-sm rounded-md px-2 py-1 mr-2">
              {tag.name}
            </span>
          </span>
        ))}
      </div>
      <div className="flex items-center">
        <span className="flex items-center w-fit font-bold bg-gray-300 shadow-sm text-gray-900 rounded-md mr-2 px-2 py-1">
          <FaLayerGroup className="mr-1" /> Published on :
        </span>
        <span className="bg-gray-200 flex items-center w-fit font-bold text-gray-600 shadow-sm rounded-md px-2 py-1 mr-2">
          {formattedDate}
          {", "} ({getRelativeTime(blog.publishedAt)})
        </span>
      </div>
      <div className="">
        <CTAButton
          label="Go to Blogs Page"
          icon={<FaBloggerB />}
          href="manage-blogs"
          className="m-0 p-2 w-full"
          variant="primary"
        />
      </div>
    </div>
  );
};

export default BlogDetailsView;
