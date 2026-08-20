import { motion } from "framer-motion";

const skeletonVariants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: { duration: 1, repeat: Infinity },
  },
};

const PostsSkeleton = () => {
  return (
    <div className="lg:mb-14 mb-10 rounded-lg pb-4 relative bg-gray-200 dark:bg-gray-900 p-4 animate-pulse mt-8">
      <motion.div
        variants={skeletonVariants}
        initial="initial"
        animate="animate"
        className="h-12 w-full bg-gray-300 dark:bg-gray-700 mb-4 rounded-t-lg"
      ></motion.div>

      <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-4 gap-2 justify-between items-center">
        <motion.div
          className="col-span-12 lg:col-span-4 space-y-4"
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
        >
          <div className="h-48 w-full bg-gray-300 dark:bg-gray-700 rounded-t-xl mb-2"></div>
          <div className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-12 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="flex items-center justify-between">
            <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded-md mb-2"></div>
            <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded-md mb-2"></div>
          </div>
        </motion.div>
        <motion.div
          className="col-span-12 lg:col-span-4 space-y-4"
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
        >
          <div className="h-48 w-full bg-gray-300 dark:bg-gray-700 rounded-t-xl mb-2"></div>
          <div className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-12 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="flex items-center justify-between">
            <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded-md mb-2"></div>
            <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded-md mb-2"></div>
          </div>
        </motion.div>
        <motion.div
          className="col-span-12 lg:col-span-4 space-y-4"
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
        >
          <div className="h-48 w-full bg-gray-300 dark:bg-gray-700 rounded-t-xl mb-2"></div>
          <div className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-12 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="flex items-center justify-between">
            <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded-md mb-2"></div>
            <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded-md mb-2"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PostsSkeleton;
