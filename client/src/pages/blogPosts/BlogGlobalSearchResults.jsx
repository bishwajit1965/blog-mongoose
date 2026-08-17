import { FaBloggerB } from "react-icons/fa";
import BlogCard from "../../components/canonicalBlogCard/BlogCard";
import Loader from "../../components/loader/Loader";
import SectionTitle from "../../components/sectionTitle/SectionTitle";

const BlogGlobalSearchResults = ({
  loading,
  user,
  filteredBlogs,
  globalSearchQuery,
}) => {
  return (
    <div className="lg:my-10 my-5">
      {loading && <Loader />}
      <SectionTitle
        title="Search Result on 👉"
        decoratedText={`${globalSearchQuery}`}
        icon={<FaBloggerB />}
        dataLength={filteredBlogs?.length}
        dataName="posts"
      />

      <div className="grid lg:grid-cols-12 grid-cols-1 gap-6 justify-between">
        {filteredBlogs?.length ? (
          filteredBlogs?.map((blog) => (
            <div key={blog?._id} className="lg:col-span-4 col-span-12">
              <BlogCard
                post={blog}
                user={user}
                showExcerpt={true}
                showContent={true}
                showComments={false}
                showBookmark={true}
                showCategory={true}
                showTags={false}
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
