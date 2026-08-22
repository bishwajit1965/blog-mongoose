import { motion } from "framer-motion";

const skeletonVariants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: { duration: 1, repeat: Infinity },
  },
};

const HeroSkeleton = () => {
  return (
    <div className="max-w-xs animate-pulse rounded-xl">
      <motion.div
        variants={skeletonVariants}
        initial="initial"
        animate="animate"
        className="space-y-6 rounded-xl"
      >
        <motion.div
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
          className="rounded-xl"
        >
          <div className="h-24 w-72 bg-gray-600 dark:bg-gray-700 rounded-t-xl">
            <div className="bg-gray-600 dark:bg-gray-700 rounded-t-xl"></div>
          </div>
          <div className="h-24 w-72 p-4 bg-white rounded-b-xl">
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          </div>
        </motion.div>

        <motion.div
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
          className="rounded-xl"
        >
          <div className="h-24 w-72 bg-gray-600 dark:bg-gray-700 rounded-t-xl">
            <div className="bg-gray-600 dark:bg-gray-700 rounded-t-xl"></div>
          </div>
          <div className="h-24 w-72 p-4 bg-white rounded-b-xl">
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSkeleton;
