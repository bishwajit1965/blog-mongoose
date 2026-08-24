import AdminPagination from "../../admin/adminComponent/adminPagination/AdminPagination";
import BlogPostCard from "./BlogPostCard";
import BlogPostSkeleton from "./BlogPostSkeleton";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";

const BlogPosts = ({
  data,
  isLoading,
  error,
  user,
  searchTerm,
  selectedCategory,
  selectedTag,
}) => {
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  // Determine if a search/filter operation is active
  const isFilteringActive = !!searchTerm || !!selectedCategory || !!selectedTag;

  useEffect(() => {
    if (!data) return;
    const newFilteredData = data.filter((post) => {
      const searchedPosts = post.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const searchedCategoryPosts = selectedCategory
        ? post.category?.name
            .toLowerCase()
            .includes(selectedCategory.toLowerCase())
        : true;

      const searchedTagPosts = selectedTag
        ? post.tags.some((tag) =>
            tag.name.toLowerCase().includes(selectedTag.toLowerCase()),
          )
        : true;

      return searchedPosts && searchedCategoryPosts && searchedTagPosts;
    });

    setFilteredData(newFilteredData);
  }, [paginatedData, data, searchTerm, selectedCategory, selectedTag]);

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
        <title>Nova Journal || Home</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="lg:space-y-6 space-y-4"
      >
        {paginatedData.length === 0 ? (
          <p className="flex justify-center">No blog post is available!</p>
        ) : (
          paginatedData.map((blog) => (
            <BlogPostCard
              key={blog._id}
              blog={blog}
              user={user}
              showAuthorInfoModal={true}
              showSocialLinks={true}
              showComments={false}
              showBookmark={true}
              showPublishDate={true}
              showCategory={true}
              showTags={false}
              isLoading={isLoading}
            />
          ))
        )}
      </motion.div>

      {/* Pagination */}
      <div className="py-4 bg-base-3000 rounded-xl bg-white dark:bg-gray-800 mt-6 shadow-lg hover:shadow-xl">
        <AdminPagination
          items={isFilteringActive ? filteredData : data}
          onPaginatedDataChange={setPaginatedData}
        />
      </div>
    </div>
  );
};

export default BlogPosts;
