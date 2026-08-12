import CountBadge from "../../admin/ui/CountBadge";
import BlogCard from "../../components/canonicalBlogCard/BlogCard";
import Loader from "../../components/loader/Loader";

const BlogGlobalSearchResults = ({
  loading,
  user,
  filteredBlogs,
  globalSearchQuery,
}) => {
  return (
    <div className="lg:my-10 my-5">
      {loading && <Loader />}
      <div className="lg:grid flex lg:grid-cols-12 grid-cols-1 gap-4 justify-between p-2 mb-4 rounded-t-lg bg-base-300 dark:bg-gray-800">
        <div className="lg:col-span-6 col-span-12">
          <h1 className="lg:text-2xl text-medium font-bold">
            Search on{" "}
            <span className="lg:text-2xl text:lg capitalize font-extrabold text-emerald-500">
              {`${globalSearchQuery}`}
            </span>
          </h1>
        </div>
        <div className="lg:col-span-6 col-span-12 flex flex-wrap items-center gap-2 justify-end lg:text-2xl text-medium font-bold">
          <CountBadge
            dataLength={filteredBlogs?.length > 0 ? filteredBlogs?.length : 0}
          />{" "}
          Posts
        </div>
      </div>

      <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 justify-between">
        {filteredBlogs?.length ? (
          filteredBlogs?.map((blog) => (
            <div key={blog?._id} className="lg:col-span-4 col-span-12">
              <BlogCard
                post={blog}
                user={user}
                showExcerpt={true}
                showContent={true}
                showComments={true}
                showBookmark={true}
                showCategory={true}
                showTags={true}
                authorInfoModal={true}
              />
            </div>
          ))
        ) : (
          <div className="lg:col-span-12 col-span-12 text-center lg:text-xl font-bold">
            Searched posts not available ! Check the search term.
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogGlobalSearchResults;
