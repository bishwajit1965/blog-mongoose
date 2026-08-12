import { FaBloggerB } from "react-icons/fa";
import SectionTitle from "../sectionTitle/SectionTitle";
import { motion } from "framer-motion";
import FeaturedPostsSkeleton from "./FeaturedPostsSkeleton";
import BlogCard from "../canonicalBlogCard/BlogCard";

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

const FeaturedPosts = ({ featuredPosts, isFeaturedLoading, user }) => {
  return (
    <>
      {isFeaturedLoading && (
        <div className="col-span-12 lg:col-span-4">
          {[...Array(1)].map((_, index) => (
            <FeaturedPostsSkeleton key={index} />
          ))}
        </div>
      )}

      {featuredPosts.length > 0 && (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionMotion}
          className="lg:max-w-7xl mx-auto mt-8"
        >
          <SectionTitle
            title="Featured"
            decoratedText="Articles"
            icon={<FaBloggerB />}
            dataLength={featuredPosts?.length}
          />
          <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 justify-between mt-4">
            {featuredPosts && featuredPosts?.length > 0 ? (
              featuredPosts?.map((blog) => (
                <div key={blog?._id} className="lg:col-span-4 col-span-12">
                  <BlogCard
                    post={blog}
                    user={user}
                    blog={blog}
                    showComments={true}
                    authorInfoModal={true}
                    showContent={true}
                    showSocialLinks={true}
                    showBookmark={true}
                  />
                </div>
              ))
            ) : (
              <p className="flex justify-center">
                No random blog posts available
              </p>
            )}
          </div>
        </motion.section>
      )}
    </>
  );
};

export default FeaturedPosts;
