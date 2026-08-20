import { useCallback, useEffect, useState } from "react";
import { getPopularPosts } from "../../admin/adminServices/blogService";
import SectionTitle from "../sectionTitle/SectionTitle";
import { FaBloggerB } from "react-icons/fa";
import BlogCard from "../canonicalBlogCard/BlogCard";
import PostsSkeleton from "../postSkeleton/PostSkeleton";
import { motion } from "framer-motion";

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

const PopularPosts = ({ user }) => {
  const [loading, setLoading] = useState();
  const [popularPosts, setPopularPosts] = useState([]);

  const fetchPopularPosts = useCallback(async () => {
    try {
      setLoading(true);
      const [popularPostResponse] = await Promise.all([getPopularPosts()]);
      setPopularPosts(popularPostResponse.popularPosts);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPopularPosts();
  }, [fetchPopularPosts]);

  return (
    <>
      {loading && (
        <div className="col-span-12 lg:col-span-4">
          {[...Array(1)].map((_, index) => (
            <PostsSkeleton key={index} />
          ))}
        </div>
      )}
      <motion.div initial="hidden" animate="visible" variants={sectionMotion}>
        {popularPosts && popularPosts?.length > 0 && (
          <SectionTitle
            title="Popular"
            decoratedText="Posts"
            dataLength={
              popularPosts?.length > 0 ? (
                popularPosts?.length
              ) : (
                <span className="text-red-500">{0}</span>
              )
            }
            icon={<FaBloggerB />}
          />
        )}

        <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-6 gap-4 justify-between">
          {popularPosts && popularPosts.length > 0 ? (
            popularPosts?.map((post) => (
              <div
                key={post._id}
                className="lg:col-span-4 col-span-12 dark:border border dark:border-base-content/15 shadow-lg dark:shadow-xm rounded-xl bg-white dark:bg-gray-800"
              >
                <BlogCard
                  post={post}
                  user={user}
                  blog={post}
                  authorInfoModal={true}
                  showSocialLinks={true}
                  showBookmark={true}
                  showPublishDate={true}
                  showCategory={true}
                  showComments={false}
                  showTags={false}
                />
              </div>
            ))
          ) : (
            <div className="flex justify-center lg:col-span-12 col-span-1">
              <p>No data found</p>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default PopularPosts;
