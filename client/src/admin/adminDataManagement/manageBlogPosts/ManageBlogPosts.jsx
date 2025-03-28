import { useEffect, useState } from "react";

import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import BlogDetailsView from "./BlogDetailsView";
import BlogPostForm from "./BlogPostForm";
import BlogsTable from "./BlogsTable";
import CTAButton from "../../../components/buttons/CTAButton";
import { FaRegPlusSquare } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import useAdminBlog from "../../adminHooks/useAdminBlog";
import useToggleColumn from "../../adminHooks/useToggleColumn";

const ManageBlogPosts = () => {
  const { adminData } = useAdminAuth();
  const { blogs, categories, tags, fetchBlogsCategoriesAndTags } =
    useAdminBlog();
  const [editingBlog, setEditingBlog] = useState(null);
  const [singleBlog, setSingleBlog] = useState(null);
  const [blogDetailDataView, setBlogDetailDataView] = useState(null);
  const { isColumnHidden, toggleColumnHide } = useToggleColumn();

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

  const handleUploadBlogView = () => {
    setEditingBlog(null); // Reset editing mode when switching to details view
    setSingleBlog(null);
    setBlogDetailDataView(null);
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
      <div className="">
        {editingBlog && (
          <CTAButton
            label="Upload Blog"
            onClick={() => handleUploadBlogView()}
            icon={<FaRegPlusSquare />}
            variant="primary"
          />
        )}
        {blogDetailDataView && (
          <CTAButton
            label="Manage Blog"
            onClick={() => handleUploadBlogView()}
            icon={<FaRegPlusSquare />}
            variant="primary"
          />
        )}

        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 grid-cols-1 md:grid-cols-2 gap-2 justify-between">
            {/* Blog Creation & Update Form Follows  */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                isColumnHidden ? "lg:col-span-12" : "lg:col-span-6"
              } lg:border-r dark:border-gray-700`}
            >
              <div className="bg-gray-100 pl-2 rounded-sm dark:bg-gray-800 shadow-sm">
                <h2 className="text-xl font-semibold">
                  {editingBlog ? (
                    <>
                      <span className="text-xl text-gray-700 dark:text-teal-500">
                        {`${editingBlog?.author?.name}`}
                      </span>
                      <span className="text-orange-700 dark:text-amber-400 pl-2">
                        Update Blog
                      </span>
                    </>
                  ) : blogDetailDataView ? (
                    "Blog Details View"
                  ) : adminData ? (
                    <>
                      <span className="text-xl text-gray-700 dark:text-teal-500">{`${adminData?.user?.name}`}</span>
                      <span className="text-orange-700 dark:text-amber-400 pl-2">
                        Add Blog Post
                      </span>
                    </>
                  ) : (
                    "N/A"
                  )}
                </h2>
              </div>

              {blogDetailDataView ? (
                <BlogDetailsView
                  blog={singleBlog}
                  manageBlog={handleUploadBlogView}
                  isHidden={isColumnHidden}
                  toggler={toggleColumnHide}
                />
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
                  isHidden={isColumnHidden}
                  toggler={toggleColumnHide}
                />
              )}
            </div>

            {/* Blogs Table Follows */}
            {!isColumnHidden && (
              <div
                className={`transition-all duration-500 ease-in-out ${
                  isColumnHidden ? "lg:col-span-12" : "lg:col-span-6"
                } lg:border-r dark:border-gray-700`}
              >
                <h2 className="text-xl font-bold mb-4 bg-base-200 shadow-sm pl-2 rounded-md dark:bg-gray-800">
                  Blog Posts
                </h2>
                <BlogsTable
                  blogs={blogs}
                  handleBlogDetailView={handleBlogDetailView}
                  onEdit={handleEdit}
                  onDelete={fetchBlogsCategoriesAndTags}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBlogPosts;
