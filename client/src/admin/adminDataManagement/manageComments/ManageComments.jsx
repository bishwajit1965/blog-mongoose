import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";

import AdminLoader from "../../adminComponent/adminLoader/AdminLoader";
import AdminPagination from "../../adminComponent/adminPagination/AdminPagination";
import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import CTAButton from "../../../components/buttons/CTAButton";
import { Helmet } from "react-helmet-async";
import ReviewCommentModal from "./ReviewCommentModal";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAdminComments } from "../../adminHooks/useAdminComments";
import { useState } from "react";

const ManageComments = () => {
  const {
    comments,
    isLoading,
    isError,
    approve,
    reject,
    remove,
    isApproving,
    isRejecting,
    isDeleting,
  } = useAdminComments();

  const [selectedId, setSelectedId] = useState(null);
  const [modalType, setModalType] = useState(null); // 'approve' or 'reject'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paginatedData, setPaginatedData] = useState(comments || []);
  const [selectedComment, setSelectedComment] = useState(null);

  console.log("Comments in admin panel", comments);

  const openReviewModal = (comment, type) => {
    setSelectedId(comment._id);
    setModalType(type);
    setIsModalOpen(true);
    setSelectedComment(comment);
  };

  const handleReviewSubmit = (comment) => {
    if (!selectedId || !modalType) return;
    const action = modalType === "approve" ? approve : reject;
    const status = modalType === "approve" ? "approved" : "rejected";
    action(
      {
        commentId: selectedId,
        commentData: {
          status,
          reviewComment: comment,
        },
      },
      {
        onSuccess: (data) => {
          toast.success(data?.message || `Comment ${status}`);
          setIsModalOpen(false);
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || `Failed to ${status} comment`
          );
        },
      }
    );
  };

  const handleDeleteComment = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        remove(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your comment has been deleted.",
          icon: "success",
        });
      }
    });
  };

  if (isLoading) return <AdminLoader />;
  if (isError) return <div>Failed to load comments.</div>;

  return (
    <div>
      <Helmet>
        <title>Blog || Manage Comments</title>
      </Helmet>

      <AdminSubTitle
        dataLength={comments?.length > 0 ? comments?.length : 0}
        subTitle="Manage"
        decoratedText="Comments"
      />

      <div className="">
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>Comment ID</th>
                <th>Comment Content</th>
                <th>Email</th>
                <th>Author</th>
                <th>Commented on</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((comment, index) => (
                <tr key={index}>
                  <td>{comment._id}</td>
                  <td>
                    {comment.content.length > 50
                      ? comment.content.slice(0, 50) + "..."
                      : comment.content}
                  </td>
                  <td>{comment.author.email}</td>
                  <td>{comment.author.name}</td>
                  <td>
                    {new Date(comment?.createdAt).toLocaleString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>{comment.status}</td>
                  <td>
                    <CTAButton
                      onClick={() => openReviewModal(comment, "approve")}
                      disabled={isApproving}
                      label="Approve"
                      className="btn btn-xs text-xs w-20"
                      variant="primary"
                      icon={<FaCheck />}
                    />
                    <CTAButton
                      onClick={() => openReviewModal(comment, "reject")}
                      disabled={isRejecting}
                      label="Reject"
                      className="btn btn-xs text-xs w-20"
                      variant="info"
                      icon={<FaTimes />}
                    />
                    <CTAButton
                      onClick={() => handleDeleteComment(comment._id)}
                      disabled={isDeleting}
                      label="Delete"
                      className="btn btn-xs text-xs w-20"
                      variant="danger"
                      icon={<FaTrash />}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Comment Modal begins*/}
          <ReviewCommentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleReviewSubmit}
            actionType={modalType}
            reviewHistory={selectedComment?.reviewHistory || []}
          />
          {/* Comment Modal ends*/}

          {/* Pagination begins*/}
          <div className="">
            <AdminPagination
              items={comments}
              onPaginatedDataChange={setPaginatedData}
            />
          </div>
          {/* Pagination ends*/}
        </div>
      </div>
    </div>
  );
};

export default ManageComments;
