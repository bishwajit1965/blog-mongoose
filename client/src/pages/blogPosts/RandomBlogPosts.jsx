import useGetRandomBlogPosts from "../../hooks/useGetRandomBlogPosts";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import { FaListOl } from "react-icons/fa";
import BlogCard from "../../components/canonicalBlogCard/BlogCard";

const RandomBlogPosts = ({ user }) => {
  const { data, isLoading, error } = useGetRandomBlogPosts();

  if (isLoading) return <p className="flex justify-center">Loading...</p>;
  if (error) return <p className="flex justify-center">{error.message}</p>;

  return (
    <div className="lg:my-10 my-4">
      <SectionTitle
        title="Random"
        decoratedText="Blog Posts"
        dataLength={data && data.length > 0 ? data.length : 0}
        icon={<FaListOl size={20} />}
      />
      {data && data.length > 0 ? (
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-6 justify-between mt-6">
          {data?.map((blog) => (
            <div key={blog} className="lg:col-span-4 col-span-12">
              <BlogCard
                post={blog}
                user={user}
                blog={blog}
                authorInfoModal={true}
                showContent={true}
                showSocialLinks={true}
                showComments={false}
                showBookmark={true}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="flex justify-center">No random blog posts available</p>
      )}
    </div>
  );
};

export default RandomBlogPosts;
