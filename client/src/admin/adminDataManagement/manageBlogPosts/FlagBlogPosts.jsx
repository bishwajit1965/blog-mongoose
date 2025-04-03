import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import BlogPostsToFlagTable from "./BlogPostsToFlagTable";
import FlaggedPostsTable from "./FlaggedPostsTable";
import { Helmet } from "react-helmet-async";
import useAdminBlog from "../../adminHooks/useAdminBlog";
import useFlaggedPosts from "../../adminHooks/useFlaggedPosts";

const FlagBlogPosts = () => {
  const { blogs, fetchBlogsCategoriesAndTags, loading } = useAdminBlog();
  const { flaggedPosts, fetchFlaggedBlogPosts } = useFlaggedPosts();

  return (
    <div>
      <Helmet>
        <title>Super Admin || Flagged Posts</title>
      </Helmet>
      <AdminSubTitle
        subTitle="Flag or Review"
        decoratedText="Blog Posts"
        dataLength={blogs?.length > 0 ? blogs?.length : "0"}
      />
      <div className="mb-10">
        <BlogPostsToFlagTable
          blogs={blogs}
          loading={loading}
          onSuccess={fetchBlogsCategoriesAndTags}
          onFetchedBlogPostsSuccess={fetchFlaggedBlogPosts}
        />
      </div>
      <div className="">
        <AdminSubTitle
          subTitle="Flagged"
          decoratedText="Blog Posts"
          dataLength={flaggedPosts?.length > 0 ? flaggedPosts?.length : "0"}
        />
        <div className="">
          <FlaggedPostsTable
            flaggedBlogPosts={flaggedPosts}
            loader={loading}
            onFetchedBlogPostsSuccess={fetchFlaggedBlogPosts}
          />
        </div>
      </div>
    </div>
  );
};

export default FlagBlogPosts;
