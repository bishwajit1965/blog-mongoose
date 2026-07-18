import { motion } from "framer-motion";

const skeletonVariants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: { duration: 1, repeat: Infinity },
  },
};

const BlogDetailsPageSkeleton = () => {
  return (
    <div className="lg:mb-14 mb-10 rounded-lg pb-4 relative bg-gray-200 dark:bg-gray-800 p-4 animate-pulse">
      <div className="h-6 w-36 bg-gray-300 dark:bg-gray-800 mb-4 rounded"></div>
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="col-span-12 lg:col-span-8 space-y-4"
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
        >
          <div className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-6 w-[90%] bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-[85%] bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-[80%] bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-[75%] bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-14 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
        </motion.div>

        <motion.div
          className="col-span-12 lg:col-span-8 h-48 bg-gray-300 dark:bg-gray-700 rounded mt-6"
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
        ></motion.div>

        <motion.div
          className="col-span-12 lg:col-span-8 h- mb-8 bg-gray-200 dark:bg-gray-800 rounded space-y-4 py-6"
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
        >
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetailsPageSkeleton;
