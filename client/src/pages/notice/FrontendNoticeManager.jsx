import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import Button from "../../components/buttons/Button";
import { FaEye } from "react-icons/fa";
import NoticeModal from "./NoticeModal";
import dateFormatter from "../../utils/dateFormatter";
import useGetNotices from "../../hooks/useGetNotices";
import { useState } from "react";

const FrontendNoticeManager = () => {
  const { data, isPending, isError } = useGetNotices();
  const [selectedNotice, setSelectedNotice] = useState(null);
  console.log("Public notices", data);
  console.log("Selected notice", selectedNotice);

  if (isPending) return <AdminLoader />;
  if (isError)
    return <div className="flex justify-center">{isError.message}</div>;

  return (
    <div>
      <h1>Frontend Notice Manager: {data?.notifications?.length}</h1>
      <div className="">
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Content</th>
                <th>Published on:</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.notifications?.length === 0 ? (
                <div className="flex justify-center">No notice found!</div>
              ) : (
                data?.notifications.map((notice, index) => (
                  <tr key={notice._id}>
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
                        onClick={() => setSelectedNotice(notice)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
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
