import { useLocation } from "react-router-dom";
import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import ComingSoonPost from "../../components/comingSoonPost/ComingSoonPost";
import PageTitle from "../../components/pageTitle/PageTitle";
import Seo from "../../components/seo/Seo";
import useGetComingSoonPost from "../../hooks/useGetComingSoonPost";
import { motion } from "framer-motion";
const ComingSoonPage = () => {
  const { data, isPending, isError } = useGetComingSoonPost();

  const location = useLocation();
  const pathName = location.pathname.split("/")[1];
  console.log("pathName", pathName);

  if (isPending) return <AdminLoader />;

  if (isError)
    return (
      <div className="flex justify-between">
        <p>{isError.message}</p>
      </div>
    );
  return (
    <>
      <Seo
        title="Coming Soon"
        description="Upcoming software engineering articles scheduled for publication on Nova Journal."
        url="blog-coming-soon"
        schemaType="CollectionPage"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="lg:max-w-6xl mx-auto p-2"
      >
        <PageTitle
          title="Coming"
          decoratedText="Soon Post(s)"
          dataLength={data?.length ? data?.length : 0}
        />
        <ComingSoonPost pathName={pathName} />
      </motion.div>
    </>
  );
};

export default ComingSoonPage;
