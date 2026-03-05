import { FaClock, FaListAlt } from "react-icons/fa";

import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import { Link } from "react-router-dom";
import useGetBlogs from "../../hooks/useGetBlogs";
import { useState } from "react";

const OlderBlogPosts = () => {
  const { data, isLoading, isError } = useGetBlogs();
  const [blogInfo, setBlogInfo] = useState(false);
  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  const handleViewBlogDetails = () => setBlogInfo(true);
  const handleHideBlogDetails = () => setBlogInfo(false);

  if (isLoading) return <AdminLoader />;
  if (isError) return <p className="flex justify-center">{isError.message}</p>;

  return (
    <div
      className="lg:grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-4 gap-2 lg:pt-10 lg:pb-4"
      onMouseEnter={handleViewBlogDetails}
      onMouseLeave={handleHideBlogDetails}
    >
      {data.length > 0 ? (
        data.slice(-4).map((blog) => (
          <div
            key={blog._id}
            className="col-span-12 lg:col-span-3 rounded-md tooltip relative"
            data-tip={
              blog?.title.length > 40
                ? blog?.title.slice(0, 40) + "..."
                : blog?.title
            }
          >
            <Link to={`/blog-details/${blog.slug}`} className="m-0">
              {" "}
              <img
                src={`${apiURL}${blog.image}`}
                alt=""
                className="lg:w-[19rem] w-[15rem] lg:h-52 h-40 rounded-md shadow-md bg-gray-200 p-2 z-50"
              />
              {blogInfo && (
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-gray-700 opacity-75 p-4 rounded-md text-white lg:space-y-2">
                  <h2 className="font-bold text-sm text-white">
                    {blog?.title}
                  </h2>
                  <p className="flex items-center capitalize">
                    <FaListAlt className="mr-2" />
                    {blog?.category?.name}
                  </p>
                  <p className="flex items-center">
                    <FaClock className="mr-2" />
                    {new Date(blog?.publishAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </Link>
          </div>
        ))
      ) : (
        <p className="flex justify-center">No blog post found!</p>
      )}
    </div>
  );
};

export default OlderBlogPosts;
