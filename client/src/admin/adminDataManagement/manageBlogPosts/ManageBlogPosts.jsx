import { useEffect, useState } from "react";

import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import BlogDetailsView from "./BlogDetailsView";
import BlogPostForm from "./BlogPostForm";
import BlogsTable from "./BlogsTable";
import { Helmet } from "react-helmet-async";
import useAdminBlog from "../../adminHooks/useAdminBlog";

const ManageBlogPosts = () => {
  const { blogs, categories, tags, fetchBlogsCategoriesAndTags } =
    useAdminBlog();
  const [editingBlog, setEditingBlog] = useState(null);
  const [singleBlog, setSingleBlog] = useState(null);
  const [blogDetailDataView, setBlogDetailDataView] = useState(null);

  useEffect(() => {
    if (
      !blogs ||
      blogs.length === 0 ||
      !categories ||
      categories.length === 0 ||
      !tags ||
      tags.length === 0
    ) {
      fetchBlogsCategoriesAndTags();
    }
  }, [fetchBlogsCategoriesAndTags, blogs, categories, tags]);

  const handleEdit = (blog) => {
    if (editingBlog?.slug === blog.slug) return; // Prevent re-render loop
    console.log("Editing blog now:", blog);
    setEditingBlog(blog);
    setBlogDetailDataView(null); // Reset the blog details view when editing
  };

  const handleCancelEdit = () => {
    setEditingBlog(null);
    setBlogDetailDataView(null); // Reset the blog details view on cancel
  };

  const handleBlogDetailView = (blog) => {
    setEditingBlog(null); // Reset editing mode when switching to details view
    setSingleBlog(blog);
    setBlogDetailDataView(true);
  };

  return (
    <div>
      <Helmet>
        <title>Blog || Manage Blog Posts</title>
      </Helmet>
      <AdminSubTitle
        subTitle="Manage"
        decoratedText="Blog Posts"
        dataLength={blogs.length}
      />
      <div className="p-2">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 grid-cols-1 md:grid-cols-2 gap-4">
            {/* Blog Creation & Update Form Follows  */}
            <div className="lg:col-span-6 col-span-12 lg:border-r dark:border-gray-700 lg:pr-3">
              <h2 className="text-xl font-semibold mb-2">
                {editingBlog
                  ? "Update Blog"
                  : blogDetailDataView
                  ? "Blog Details View"
                  : "Add Blog Post"}
              </h2>

              {blogDetailDataView ? (
                <BlogDetailsView blog={singleBlog} />
              ) : (
                <BlogPostForm
                  onSuccess={() => {
                    handleCancelEdit();
                    fetchBlogsCategoriesAndTags();
                  }}
                  blogs={blogs}
                  categories={categories}
                  tags={tags}
                  existingBlog={editingBlog}
                />
              )}
            </div>

            {/* Blogs Table Follows */}
            <div className="lg:col-span-6 col-span-12 dark:border-gray-700 lg:pr-">
              <h2 className="text-xl font-semibold mb-2">Blog Posts</h2>
              <BlogsTable
                blogs={blogs}
                handleBlogDetailView={handleBlogDetailView}
                onEdit={handleEdit}
                onDelete={fetchBlogsCategoriesAndTags}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBlogPosts;
