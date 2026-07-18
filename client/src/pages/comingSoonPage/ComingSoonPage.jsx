import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import ComingSoonPost from "../../components/comingSoonPost/ComingSoonPost";
import PageTitle from "../../components/pageTitle/PageTitle";
import useGetComingSoonPost from "../../hooks/useGetComingSoonPost";
import { motion } from "framer-motion";
const ComingSoonPage = () => {
  const { data, isPending, isError } = useGetComingSoonPost();

  if (isPending) return <AdminLoader />;

  if (isError)
    return (
      <div className="flex justify-between">
        <p>{isError.message}</p>
      </div>
    );
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <PageTitle
        title="Coming"
        decoratedText="Soon Post(s)"
        dataLength={data?.length ? data?.length : 0}
      />
      <ComingSoonPost />
    </motion.div>
  );
};

export default ComingSoonPage;
