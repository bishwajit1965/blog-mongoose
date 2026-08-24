import { useLocation } from "react-router-dom";
import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import ComingSoonPost from "../../components/comingSoonPost/ComingSoonPost";
import Seo from "../../components/seo/Seo";
import useGetComingSoonPost from "../../hooks/useGetComingSoonPost";
import { motion } from "framer-motion";
import CustomPageTitle from "../../components/pageTitle/CustomPageTitle";
const ComingSoonPage = () => {
  const { data, isPending, isError } = useGetComingSoonPost();

  const location = useLocation();
  const pathName = location.pathname.split("/")[1];

  if (isPending) return <AdminLoader />;

  // Latest coming soon post selection
  const latestComingSoon = data?.reduce((latest, notice) => {
    if (!latest) return notice;

    const latestDate = new Date(latest.updatedAt || latest.createdAt);

    const noticeDate = new Date(notice.updatedAt || notice.createdAt);

    return noticeDate > latestDate ? notice : latest;
  }, null);

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
        className="lg:max-w-6xl mx-auto"
      >
        <CustomPageTitle
          title="Coming Soon"
          dataLength={data?.length ? data?.length : 0}
          updatedAt={latestComingSoon?.updatedAt || latestComingSoon?.createdAt}
        />

        <div className="max-w-6xl mx-auto p-4">
          <ComingSoonPost pathName={pathName} />
        </div>
      </motion.div>
    </>
  );
};

export default ComingSoonPage;
