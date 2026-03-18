import { useState } from "react";
import Button from "../../components/buttons/Button";
import { FaEye } from "react-icons/fa";
import NoticeModal from "./NoticeModal";
import dateFormatter from "../../utils/dateFormatter";
import usePublicData from "../../providers/usePublicData";
import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import { Helmet } from "react-helmet-async";

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
      <h1>Frontend Notice Manager: {notices?.length}</h1>
      <div className="">
        <div className="overflow-x-auto">
          <table className="table table-xs ">
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
      </div>
    </div>
  );
};

export default FrontendNoticeManager;
