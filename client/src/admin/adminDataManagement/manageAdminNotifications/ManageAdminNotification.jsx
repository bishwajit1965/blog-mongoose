import AdminNoticeTable from "./AdminNoticeTable";
import AdminNotificationForm from "./AdminNotificationForm";
import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import CTAButton from "../../../components/buttons/CTAButton";
import { FaRegPlusSquare } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import NoticeDetailsView from "./NoticeDetailsView";
import useAdminMessageNotification from "../../adminHooks/useAdminMessageNotification";
import { useState } from "react";
import useToggleColumn from "../../adminHooks/useToggleColumn";

const ManageAdminNotification = () => {
  const [editingNotice, setEditingNotice] = useState(null);
  const [noticeDetailDataView, setNoticeDetailDataView] = useState(null);
  const [singleNotice, setSingleNotice] = useState(null);
  const { allMessageNotification, fetchAdminMessageNotification } =
    useAdminMessageNotification();
  const { isColumnHidden, toggleColumnHide } = useToggleColumn();

  const handleEdit = (notice) => {
    if (editingNotice?._id === notice._id) return; // Prevent re-render loop
    console.log("Editing notice now:", notice);
    setEditingNotice(notice);
    setNoticeDetailDataView(null); // Reset the notice details view when editing
  };

  const handleNoticeDetailView = (notice) => {
    setEditingNotice(null); // Reset editing mode when switching to details view
    setSingleNotice(notice);
    setNoticeDetailDataView(true);
  };

  const handleCancelEdit = () => {
    setEditingNotice(null);
    setNoticeDetailDataView(null); // Reset the notice details view on cancel
  };

  const handleUploadNoticeView = () => {
    setEditingNotice(null); // Reset editing mode when switching to details view
    setSingleNotice(null);
    setNoticeDetailDataView(null);
  };

  return (
    <div className="">
      <Helmet>
        <title>Blog || Manage Notification</title>
      </Helmet>
      <AdminSubTitle
        subTitle="Manage"
        decoratedText="Admin Notice"
        dataLength={
          allMessageNotification.length ? allMessageNotification.length : "0"
        }
      />
      {editingNotice && (
        <CTAButton
          label="Upload Notice"
          onClick={() => handleUploadNoticeView()}
          icon={<FaRegPlusSquare />}
          variant="primary"
        />
      )}
      {noticeDetailDataView && (
        <CTAButton
          label="Manage Notice"
          onClick={() => handleUploadNoticeView()}
          icon={<FaRegPlusSquare />}
          variant="primary"
        />
      )}
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-2 justify-between">
        <div
          className={`transition-all duration-500 ease-in-out ${
            isColumnHidden ? "lg:col-span-12" : "lg:col-span-6"
          } lg:border-r dark:border-gray-700`}
        >
          {noticeDetailDataView ? (
            <NoticeDetailsView
              notice={singleNotice}
              isHidden={isColumnHidden}
              toggler={toggleColumnHide}
              manageNotice={handleUploadNoticeView}
            />
          ) : (
            <AdminNotificationForm
              editingNotice={editingNotice}
              onSuccess={() => {
                handleCancelEdit();
                fetchAdminMessageNotification();
              }}
              existingNotice={editingNotice}
              isHidden={isColumnHidden}
              toggler={toggleColumnHide}
            />
          )}
        </div>
        {/* Notification table follows */}
        {!isColumnHidden && (
          <div
            className={`transition-all duration-500 ease-in-out ${
              isColumnHidden ? "lg:col-span-12" : "lg:col-span-6"
            } lg:border-r dark:border-gray-700`}
          >
            <AdminNoticeTable
              notices={allMessageNotification}
              onEdit={handleEdit}
              onDelete={fetchAdminMessageNotification}
              handleNoticeDetailView={handleNoticeDetailView}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAdminNotification;
