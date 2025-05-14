import { motion } from "framer-motion";

const skeletonVariants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: { duration: 1, repeat: Infinity },
  },
};

const BlogPostSkeleton = () => {
  return (
    <div className="lg:mb-14 mb-10 rounded-lg pb-4 relative bg-gray-200 p-4 animate-pulse">
      <div className="h-6 w-32 bg-gray-300 mb-4 rounded"></div>
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-2 justify-between items-center">
        <motion.div
          className="col-span-12 lg:col-span-8 space-y-4"
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
        >
          <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
          <div className="h-6 w-1/2 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-full bg-gray-300 rounded"></div>
          <div className="h-4 w-full bg-gray-300 rounded"></div>
          <div className="h-4 w-full bg-gray-300 rounded"></div>
        </motion.div>

        <motion.div
          className="col-span-12 lg:col-span-4 h-48 bg-gray-300 rounded"
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
        ></motion.div>
      </div>
    </div>
  );
};

export default BlogPostSkeleton;
