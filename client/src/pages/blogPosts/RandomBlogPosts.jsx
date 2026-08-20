import useGetRandomBlogPosts from "../../hooks/useGetRandomBlogPosts";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import { FaListOl } from "react-icons/fa";
import BlogCard from "../../components/canonicalBlogCard/BlogCard";
import { motion } from "framer-motion";
import PostsSkeleton from "../../components/postSkeleton/PostSkeleton";
const sectionMotion = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const RandomBlogPosts = ({ user }) => {
  const { data, isLoading, error } = useGetRandomBlogPosts();

  if (error) return <p className="flex justify-center">{error.message}</p>;

  return (
    <>
      {isLoading && (
        <div className="col-span-12 lg:col-span-4">
          {[...Array(1)].map((_, index) => (
            <PostsSkeleton key={index} />
          ))}
        </div>
      )}

      {data?.length > 0 && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionMotion}
          className="lg:my-10 my-4"
        >
          <SectionTitle
            title="Random"
            decoratedText="Blog Posts"
            dataLength={data && data.length > 0 ? data.length : 0}
            icon={<FaListOl size={20} />}
          />

          {data && data.length > 0 ? (
            <div className="grid lg:grid-cols-12 grid-cols-1 gap-6 justify-between mt-6">
              {data?.map((blog) => (
                <div key={blog?._id} className="lg:col-span-4 col-span-12">
                  <BlogCard
                    post={blog}
                    user={user}
                    authorInfoModal={true}
                    showSocialLinks={true}
                    showComments={false}
                    showBookmark={true}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="flex justify-center">
              No random blog posts available
            </p>
          )}
        </motion.div>
      )}
    </>
  );
};

export default RandomBlogPosts;
