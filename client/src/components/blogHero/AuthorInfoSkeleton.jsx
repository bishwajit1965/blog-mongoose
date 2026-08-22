import { motion } from "framer-motion";

const skeletonVariants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: { duration: 1, repeat: Infinity },
  },
};

const AuthorInfoSkeleton = () => {
  return (
    <motion.div
      variants={skeletonVariants}
      initial="initial"
      animate="animate"
      className="lg:col-span-7 col-span-12 animate-pulse"
    >
      <motion.div
        variants={skeletonVariants}
        initial="initial"
        animate="animate"
        className="bg-slate-950 dark:bg-slate-950 border border-gray-700 rounded-xl h-32 p-4 w-full min-h-36"
      >
        <div className="flex items-center gap-2">
          <div className="space-y-2">
            <div className="w-20 h-20 rounded-full bg-gray-600 dark:bg-gray-700"></div>
            <div className="w-20 h-4 rounded-full bg-gray-600 dark:bg-gray-700"></div>
          </div>
          <div className="w-full space-y-3">
            <div className="rounded-full h-4 w-full bg-gray-600 dark:bg-gray-700"></div>
            <div className="rounded-full h-4 w-full bg-gray-600 dark:bg-gray-700"></div>
            <div className="rounded-full h-4 w-full bg-gray-600 dark:bg-gray-700"></div>
          </div>
          <div className="bg-gray-300 rounded-md h-12"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthorInfoSkeleton;
