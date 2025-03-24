import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import ArchiveBlogPostTable from "./ArchiveBlogPostTable";
import BlogsArchivedTable from "./BlogsArchivedTable";
import { Helmet } from "react-helmet-async";
import useArchivedBlog from "../../adminHooks/useArchivedBlog";

const ArchivedBlogPosts = () => {
  const {
    blogs,
    loading,
    archivedBlogs,
    fetchArchivedBlogPostsCategoriesAndTags,
  } = useArchivedBlog();

  return (
    <div>
      <AdminSubTitle
        subTitle="Manage"
        decoratedText="Archived Blog Posts"
        dataLength={blogs?.length ? blogs.length : "0"}
      />
      <div className="p-">
        <Helmet>
          <title>Blog || Manage Archived Blog Posts</title>
        </Helmet>
        <div className="">
          <ArchiveBlogPostTable
            blogs={blogs}
            loading={loading}
            archivedBlogs={archivedBlogs}
            onSuccess={fetchArchivedBlogPostsCategoriesAndTags}
          />
        </div>
        <div className="py-10">
          <BlogsArchivedTable
            key={archivedBlogs.length} // Forces re-render on length change
            archivedBlogs={archivedBlogs}
            loading={loading}
            onSuccess={fetchArchivedBlogPostsCategoriesAndTags}
          />
        </div>
      </div>
    </div>
  );
};

export default ArchivedBlogPosts;
