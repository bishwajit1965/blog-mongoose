import {
  FaEdit,
  FaEye,
  FaTrashAlt,
  FaTrashRestoreAlt,
  FaUndo,
} from "react-icons/fa";
import {
  archiveNotice,
  permanentDeleteNoticeById,
  publishNotice,
  softDeleteNotice,
  toggleNotificationActiveStatus,
} from "../../adminServices/notificationApiService";

import AdminLoader from "../../adminComponent/adminLoader/AdminLoader";
import AdminPagination from "../../adminComponent/adminPagination/AdminPagination";
import CTAButton from "../../../components/buttons/CTAButton";
import Swal from "sweetalert2";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import { useState } from "react";

const AdminNoticeTable = ({
  notices,
  onEdit,
  onDelete,
  handleNoticeDetailView,
}) => {
  const [loading, setLoading] = useState(false);
  const { adminData, hasPermission } = useAdminAuth();
  const [paginatedData, setPaginatedData] = useState(notices || []);
  console.log("Notices in table page:", notices);

  /**===============================================
   * || HELPERS TO REFACTOR AND IMPLEMENT DRY BEGINS
   * ===============================================*/

  // Dynamic button size for DRY
  const btnSize = "btn btn-xs text-xs w-24";
  const btnSizeSm = "btn btn-xs text-xs w-20";

  const getToggleButtonProps = (status) => {
    switch (status) {
      case "published":
        return {
          label: "ABORT",
          variant: "danger",
          icon: <FaUndo />,
        };
      case "draft":
      case "archived":
      case "deleted":
        return {
          label: "RELEASE",
          variant: "success",
          icon: <FaEye />,
        };
      default:
        return {
          label: "TOGGLE",
          variant: "warning",
          icon: <FaEye />,
        };
    }
  };
  const renderToggleButton = (notice) => {
    const { label, variant, icon } = getToggleButtonProps(notice.status);
    return (
      <CTAButton
        onClick={() => handleToggleNotification(notice._id)}
        label={label}
        variant={variant}
        icon={icon}
        className="btn btn-xs text-xs w-20"
      />
    );
  };

  /**============================================
   * HELPERS TO REFACTOR AND IMPLEMENT DRY ENDS ||
   * ============================================*/

  // Handle publish notice
  const handlePublishNotice = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to publish this notice?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, publish it!",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        if (hasPermission("publish-notification")) {
          await publishNotice(id);
          await Swal.fire({
            title: "Notification Toggled!",
            text: "This notice has been published successfully.",
            icon: "success",
          });
        } else {
          await Swal.fire({
            title: "Permission Denied",
            text: "You do not have permission to publish this notice!",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error in publishing notice:", error);
        await Swal.fire({
          title: "Error!",
          text: "Failed to publish the notice.",
          icon: "error",
        });
      } finally {
        await onDelete();
        setLoading(false);
      }
    }
  };

  // Archive notice
  const handleArchiveNotice = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to archive this notice?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, archive it!",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        if (hasPermission("archive-notification")) {
          await archiveNotice(id);
          await Swal.fire({
            title: "Notification Archived!",
            text: "This notice has been archived successfully.",
            icon: "success",
          });
        } else {
          await Swal.fire({
            title: "Permission Denied",
            text: "You do not have permission to archive this notice!",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error in archiving notice:", error);
        await Swal.fire({
          title: "Error!",
          text: "Failed to archive the notice.",
          icon: "error",
        });
      } finally {
        await onDelete();
        setLoading(false);
      }
    }
  };

  // Soft delete a notice
  const handleSoftDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to soft-delete this notice?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, soft delete it!",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        if (hasPermission("soft-delete-notice")) {
          await softDeleteNotice(id);
          await Swal.fire({
            title: "Soft Deleted!",
            text: "This notice has been soft-deleted successfully.",
            icon: "success",
          });
        } else {
          await Swal.fire({
            title: "Permission Denied",
            text: "You do not have permission to soft-delete this notice!",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error in soft-deleting notice:", error);
        await Swal.fire({
          title: "Error!",
          text: "Failed to soft-delete the notice.",
          icon: "error",
        });
      } finally {
        await onDelete();
        setLoading(false);
      }
    }
  };

  // Toggle notification status publish -><- withdraw
  const handleToggleNotification = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to toggle this notice?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, toggle it!",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        if (hasPermission("toggle-notification-status")) {
          await toggleNotificationActiveStatus(id);
          await Swal.fire({
            title: "Notification Toggled!",
            text: "This notice has been toggled successfully.",
            icon: "success",
          });
        } else {
          await Swal.fire({
            title: "Permission Denied",
            text: "You do not have permission to toggle this notice!",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error in toggling notice:", error);
        await Swal.fire({
          title: "Error!",
          text: "Failed to toggle the notice.",
          icon: "error",
        });
      } finally {
        await onDelete();
        setLoading(false);
      }
    }
  };

  // Handle permanent delete notification
  const handlePermanentDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to permanently delete this notice?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, toggle it!",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        if (hasPermission("delete-notification")) {
          await permanentDeleteNoticeById(id);
          await Swal.fire({
            title: "Notice deleted!",
            text: "This notice has been deleted successfully.",
            icon: "success",
          });
        } else {
          await Swal.fire({
            title: "Permission Denied",
            text: "You do not have permission to permanently delete this notice!",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error in deleting notice:", error);
        await Swal.fire({
          title: "Error!",
          text: "Failed to permanently delete the notice.",
          icon: "error",
        });
      } finally {
        await onDelete();
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {loading && <AdminLoader />}
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>title</th>
              <th>Content</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((notice, index) => (
                <tr key={notice._id}>
                  <th>{index + 1}</th>
                  <td>{notice.title}</td>
                  <td>{notice.content.slice(0, 20)}</td>
                  <td>
                    {notice?.status === "draft" ? (
                      <span className="text-teal-500 font-bold uppercase">
                        {notice?.status}
                      </span>
                    ) : notice?.status === "published" ? (
                      <span className="text-indigo-500 font-bold uppercase flex">
                        <span>✅</span> <span>{notice?.status}</span>
                      </span>
                    ) : notice?.status === "archived" ? (
                      <span className="text-yellow-500 font-bold uppercase">
                        {notice?.status}
                      </span>
                    ) : notice?.status === "deleted" ? (
                      <span className="text-red-500 font-bold uppercase">
                        {notice?.status}
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="">
                    {Array.isArray(adminData?.user?.roles) &&
                    adminData.user.roles.some(
                      (role) =>
                        role.name === "super-admin" || role.name === "admin"
                    ) ? (
                      <div>
                        <div className="flex items-center">
                          <CTAButton
                            onClick={() => onEdit(notice)}
                            label="EDIT"
                            icon={<FaEdit />}
                            className={btnSizeSm}
                            variant="info"
                          />
                          {notice.status !== "published" ? (
                            <CTAButton
                              onClick={() => handlePublishNotice(notice._id)}
                              label="PUBLISH"
                              icon={<FaEye />}
                              className={btnSize}
                              variant="success"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="flex items-center">
                          <CTAButton
                            onClick={() => handleNoticeDetailView(notice)}
                            label="VIEW"
                            icon={<FaEye />}
                            className={btnSizeSm}
                            variant="primary"
                          />
                          {notice.status !== "archived" && (
                            <CTAButton
                              onClick={() => handleArchiveNotice(notice._id)}
                              label="ARCHIVE"
                              icon={<FaEye />}
                              className={btnSize}
                              variant="warning"
                            />
                          )}
                        </div>
                        <div className="flex items-center">
                          <CTAButton
                            onClick={() => handlePermanentDelete(notice._id)}
                            label="DELETE"
                            icon={<FaTrashAlt />}
                            className={btnSizeSm}
                            variant="danger"
                          />

                          {notice.status !== "deleted" && (
                            <CTAButton
                              onClick={() => handleSoftDelete(notice._id)}
                              label="S_DELETE"
                              icon={<FaTrashRestoreAlt />}
                              className={btnSize}
                              variant="danger"
                            />
                          )}
                        </div>

                        <div className="flex items-center">
                          {renderToggleButton(notice)}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan="5">No notice is found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="">
          <AdminPagination
            items={notices}
            onPaginatedDataChange={setPaginatedData}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminNoticeTable;
