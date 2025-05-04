import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import AdminPagination from "../../admin/adminComponent/adminPagination/AdminPagination";
import BlogPostCard from "./BlogPostCard";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const BlogPosts = ({ data, isLoading, error, user }) => {
  const [paginatedData, setPaginatedData] = useState(data || []);
  console.log(data, isLoading, error);
  if (isLoading) return <AdminLoader />;
  if (error) return <p>Error!</p>;
  return (
    <div className="">
      <Helmet>
        <title>Blog || Blog Posts</title>
      </Helmet>
      <div className="">
        {paginatedData.map((blog) => (
          <BlogPostCard key={blog._id} blog={blog} user={user} />
        ))}
      </div>
      <div className="lg:py-4 border-t py-2 shadow-xl bg-base-100 rounded-lg">
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
