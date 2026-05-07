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

/**=============================================
 * For the toggling of React Multi Select fields
 * @param {*} isDark
 * @returns
 *=============================================*/
const customStyles = (isDark) => ({
  control: (provided) => ({
    ...provided,
    backgroundColor: isDark ? "#1e293b" : "#ffffff",
    borderColor: isDark ? "#334155" : "#d1d5db",
    color: isDark ? "#e5e7eb" : "#111827",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: isDark ? "#1e293b" : "#ffffff",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? isDark
        ? "#334155"
        : "#e5e7eb"
      : isDark
        ? "#1e293b"
        : "#ffffff",
    color: isDark ? "#e5e7eb" : "#111827",
    cursor: "pointer",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: isDark ? "#334155" : "#e5e7eb",
  }),

  multiValueLabel: (provided) => ({
    ...provided,
    color: isDark ? "#e5e7eb" : "#111827",
  }),

  multiValueRemove: (provided) => ({
    ...provided,
    color: isDark ? "#e5e7eb" : "#111827",
    ":hover": {
      backgroundColor: "#ef4444",
      color: "white",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: isDark ? "#e5e7eb" : "#111827",
  }),

  placeholder: (provided) => ({
    ...provided,
    color: isDark ? "#94a3b8" : "#6b7280",
  }),

  singleValue: (provided) => ({
    ...provided,
    color: isDark ? "#e5e7eb" : "#111827",
  }),
});
const ManageBlogPosts = () => {
  const { adminData } = useAdminAuth();
  const {
    superAdminBlogsAll,
    categories,
    tags,
    fetchBlogsForCrudInSuperAdminBlogManagement,
  } = useAdminBlog();
  const [editingBlog, setEditingBlog] = useState(null);
  const [singleBlog, setSingleBlog] = useState(null);
  const [blogDetailDataView, setBlogDetailDataView] = useState(null);
  const { isColumnHidden, toggleColumnHide } = useToggleColumn();
  const [isDark, setIsDark] = useState(
    document.body.classList.contains("dark"),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains("dark"));
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      !superAdminBlogsAll ||
      superAdminBlogsAll.length === 0 ||
      !categories ||
      categories.length === 0 ||
      !tags ||
      tags.length === 0
    ) {
      fetchBlogsForCrudInSuperAdminBlogManagement();
    }
  }, [
    fetchBlogsForCrudInSuperAdminBlogManagement,
    superAdminBlogsAll,
    categories,
    tags,
  ]);

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
        dataLength={superAdminBlogsAll.length}
      />
      <div className="">
        <div className="p-1">
          {editingBlog && (
            <CTAButton
              label="Upload Blog"
              onClick={() => handleUploadBlogView()}
              icon={<FaRegPlusSquare />}
              variant="success"
              className="btn btn-xs text-xs"
            />
          )}
          {blogDetailDataView && (
            <CTAButton
              label="Manage Blog"
              onClick={() => handleUploadBlogView()}
              icon={<FaRegPlusSquare />}
              variant="success"
              className="btn btn-xs text-xs"
            />
          )}
        </div>

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
                    fetchBlogsForCrudInSuperAdminBlogManagement();
                  }}
                  blogs={superAdminBlogsAll}
                  categories={categories}
                  tags={tags}
                  existingBlog={editingBlog}
                  isHidden={isColumnHidden}
                  toggler={toggleColumnHide}
                  isDark={isDark}
                  customStyles={customStyles}
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
                <h2 className="text-xl font-bold mb-2 bg-base-200 shadow-sm pl-2 rounded-md dark:bg-gray-800">
                  Blog Posts Table
                </h2>
                <BlogsTable
                  blogs={superAdminBlogsAll}
                  handleBlogDetailView={handleBlogDetailView}
                  onEdit={handleEdit}
                  onDelete={fetchBlogsForCrudInSuperAdminBlogManagement}
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
