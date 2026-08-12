import { useState } from "react";
import Button from "../../components/buttons/Button";
import { FaEye } from "react-icons/fa";
import NoticeModal from "./NoticeModal";
import dateFormatter from "../../utils/dateFormatter";
import usePublicData from "../../providers/usePublicData";
import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import { motion } from "framer-motion";
import Seo from "../../components/seo/Seo";
import CustomPageTitle from "../../components/pageTitle/CustomPageTitle";

const FrontendNoticeManager = () => {
  const { notices, loading } = usePublicData();

  const [selectedNotice, setSelectedNotice] = useState(null);

  // Latest notice selection
  const latestNotice = notices?.reduce((latest, notice) => {
    if (!latest) return notice;

    const latestDate = new Date(latest.updatedAt || latest.createdAt);

    const noticeDate = new Date(notice.updatedAt || notice.createdAt);

    return noticeDate > latestDate ? notice : latest;
  }, null);

  const handleSelectNotice = (notice) => {
    setSelectedNotice(notice);
  };

  return (
    <div>
      <Seo
        title="Notice"
        description="Latest announcements, notices, and updates from Nova Journal."
        url="notice"
        schemaType="CollectionPage"
      />

      {loading && <AdminLoader />}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className=""
      >
        <CustomPageTitle
          title="Notice Management"
          dataLength={notices?.length > 0 ? notices?.length : 0}
          updatedAt={latestNotice?.updatedAt || latestNotice?.createdAt}
        />

        <div className="lg:max-w-6xl mx-auto p-4">
          <div className="w-full overflow-x-autos rounded-lgs borders border-base-300s">
            <table className="table table-xs min-w-[900px]">
              <thead className="">
                <tr className="dark:border-gray-700">
                  <th>#</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Published on:</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {notices?.length === 0 ? (
                  <tr className="text-center">
                    <th colSpan={5}>No notice found!</th>
                  </tr>
                ) : (
                  notices?.map((notice, index) => (
                    <tr key={notice._id} className="dark:border-gray-700">
                      <th>{index + 1}</th>
                      <td>{notice.title}</td>
                      <td>
                        {notice?.content.length > 50
                          ? notice.content.slice(0, 50) + "..."
                          : notice.content}
                      </td>
                      <td>{dateFormatter(notice.publishedAt)}</td>

                      <td>
                        <Button
                          label="View"
                          size="xs"
                          icon={<FaEye />}
                          variant="outline"
                          className=""
                          onClick={() => handleSelectNotice(notice)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot className="dark:border-gray-700">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Published on:</th>
                  <th>Actions</th>
                </tr>
              </tfoot>
            </table>
            {selectedNotice && (
              <NoticeModal
                notice={selectedNotice}
                onClose={() => setSelectedNotice(null)}
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FrontendNoticeManager;
