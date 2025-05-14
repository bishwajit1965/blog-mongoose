import AdminPagination from "../../admin/adminComponent/adminPagination/AdminPagination";
import BlogPostCard from "./BlogPostCard";
import BlogPostSkeleton from "./BlogPostSkeleton";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const BlogPosts = ({ data, isLoading, error, user }) => {
  const [paginatedData, setPaginatedData] = useState(data || []);
  console.log(data, isLoading, error);

  if (isLoading) {
    return (
      <div className="col-span-12 lg:col-span-8">
        {[...Array(5)].map((_, index) => (
          <BlogPostSkeleton key={index} />
        ))}
      </div>
    );
  }
  if (error) return <p className="flex justify-center">{error.message}</p>;

  return (
    <div className="">
      <Helmet>
        <title>Blog || Blog Posts</title>
      </Helmet>
      <div className="">
        {paginatedData.length > 0 ? (
          paginatedData.map((blog) => (
            <BlogPostCard key={blog._id} blog={blog} user={user} />
          ))
        ) : (
          <p className="flex justify-center">No blog post is available!</p>
        )}
      </div>
      <div className="lg:py-2 border-t py-2 shadow-xls bg-base-3000 rounded-lg">
        {/* Pagination */}
        <AdminPagination
          items={data}
          onPaginatedDataChange={setPaginatedData}
        />
      </div>
    </div>
  );
};

export default BlogPosts;
