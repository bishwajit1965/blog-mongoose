import { FaBloggerB, FaBookReader } from "react-icons/fa";
import SectionTitle from "../sectionTitle/SectionTitle";
import Button from "../buttons/Button";
import { motion } from "framer-motion";
import FeaturedPostsSkeleton from "./FeaturedPostsSkeleton";

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

const FeaturedPosts = ({ featuredPosts, isFeaturedLoading }) => {
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
            dataLength={featuredPosts.length}
          />
          <div className="grid lg:grid-cols-3 gap-4 mt-4">
            {featuredPosts.map((post) => (
              <article
                key={post._id}
                className="overflow-hidden rounded-xl border border-base-300 dark:border-gray-700 bg-base-100s shadow-sm transition hover:shadow-lg"
              >
                <img
                  src={
                    post.image?.url ||
                    post.featuredImage ||
                    "https://placehold.co/600x400"
                  }
                  alt={post.title}
                  className="lg:h-52 h-auto w-full object-cover"
                />
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="badge badge-sm badge-outline">
                      {post.category?.name || "General"}
                    </span>
                    <span>
                      {new Date(
                        post.publishAt || post.createdAt,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold leading-snug text-slate-800 dark:text-slate-100 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
                    {post.excerpt || "Read this article to learn more."}
                  </p>
                  <div className="">
                    <Button
                      href={`/blog-details/${post.slug}`}
                      label="Read More"
                      icon={<FaBookReader />}
                      variant="outline"
                      size="xs"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </motion.section>
      )}
    </>
  );
};

export default FeaturedPosts;
