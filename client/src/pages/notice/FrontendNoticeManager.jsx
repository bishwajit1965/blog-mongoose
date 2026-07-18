import { useState } from "react";
import Button from "../../components/buttons/Button";
import { FaEye } from "react-icons/fa";
import NoticeModal from "./NoticeModal";
import dateFormatter from "../../utils/dateFormatter";
import usePublicData from "../../providers/usePublicData";
import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import PageTitle from "../../components/pageTitle/PageTitle";

const FrontendNoticeManager = () => {
  const { notices, loading } = usePublicData();
  console.log("Notices data", notices);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const handleSelectNotice = (notice) => {
    setSelectedNotice(notice);
  };

  return (
    <div>
      <Helmet>
        <title>Nova Blogging Platform || Notice Page</title>
      </Helmet>
      {loading && <AdminLoader />}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className=""
      >
        <PageTitle
          title="Notice"
          decoratedText="Management"
          dataLength={notices?.length > 0 ? notices?.length : 0}
        />

        <div className="overflow-x-auto">
          <table className="table table-sm">
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
                        icon={<FaEye />}
                        variant="outline"
                        className="btn btn-xs"
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
      </motion.div>
    </div>
  );
};

export default FrontendNoticeManager;
