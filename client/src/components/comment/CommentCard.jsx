import {
  FaArrowAltCircleRight,
  FaClock,
  FaCommentAlt,
  FaEdit,
  FaPlusCircle,
  FaReply,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { deleteComment, updateComment } from "../../services/commentApiService";
import { useEffect, useState } from "react";

import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import CTAButton from "../buttons/CTAButton";
import ReplyToCommentForm from "./ReplyToCommentForm";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useDateFormatter from "../../hooks/useDateFormatter";
import { useMutation } from "@tanstack/react-query";
import useToggleViewModal from "../../hooks/useToggleViewModal";

const CommentCard = ({
  comment,
  slug,
  onDataChanged,
  index,
  // nestedComments,
}) => {
  const [editingMode, setEditingMode] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null); // stores parentId
  console.log("Nested comments:", comment.replies);
  const [commentData, setCommentData] = useState({
    name: "",
    email: "",
    content: "",
  });

  // Set initial data for editing, if any
  useEffect(() => {
    if (comment) {
      setEditingMode(true);
      setEditingCommentId(comment._id);
      setCommentData({
        name: comment.name,
        email: comment.email,
        content: comment.content,
      });
    } else {
      setEditingMode(false);
      setCommentData({
        name: "",
        email: "",
        content: "",
      });
    }
  }, [comment]);

  const { isOpen, modalData, openModal, closeModal } = useToggleViewModal();
  const { _id, author, level, content, name, createdAt } = comment || {};
  const formattedDate = useDateFormatter(createdAt);
  const [errors, setErrors] = useState({});

  // TanStack mutation for updating a comment
  const { mutate: updateMutation, isPending: isEditing } = useMutation({
    mutationFn: (updatedData) => updateComment(editingCommentId, updatedData),
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message || "Comment updated successfully!");
        setEditingMode(false);
        setEditingCommentId(null);
        setCommentData({ name: "", email: "", content: "" });
        closeModal(); // Close modal after successful update
        onDataChanged?.();
      }
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update comment."
      );
    },
  });

  // TanStack mutation for deleting a comment
  const { mutate: deleteMutation, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteComment(comment._id),
    onSuccess: (response) => {
      if (response.success) {
        // toast.success(response.message || "Comment deleted successfully!");
        setEditingMode(false);
        setEditingCommentId(null);
        setCommentData({ name: "", email: "", content: "" });
        closeModal();
        onDataChanged?.();
      }
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete comment."
      );
    },
  });

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    const { name, email, content } = commentData;
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name field is required. ";
    if (!email.trim()) newErrors.email = "Email field is required. ";
    if (!content.trim()) newErrors.content = "Content field is required. ";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (editingMode) {
      updateMutation(commentData); // Update the comment
    }
  };

  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const handleCancelEdit = () => {
    closeModal();
  };

  const handleDeleteComment = async (id) => {
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
        deleteMutation(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your comment has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="lg:py-4 grid py-2 lg:space-y-3 space-y-2">
      {isEditing && <AdminLoader />}

      <div className="lg:flex flex-1 grid grid-cols-1 justify-between items-center gap-4">
        <div className="lg:flex hidden lg:visible items-center justify-center w-8 h-8 rounded-full bg-gray-200 shadow-sm border border-gray-200">
          <div className="lg:font-bold font-semibold">{index + 1}</div>
        </div>

        <div className="lg:border-l-4 border-l-2 border-gray-300 rounded-lg shadow-sm shadow-gray-300 lg:w-full w-full lg:p-3 p-2 border">
          <div className="flex lg:grid items-center justify-between">
            <p>{_id}</p>
            <p>Level: {level}</p>
            <div className="">
              {author?.avatar ? (
                <div className="flex items-center lg:space-x-3 space-x-2">
                  <span>
                    <img
                      src={author.avatar}
                      alt={name}
                      className="w-12 rounded-full bg-white p-1"
                    />
                  </span>
                  <span className="text-gray-500 lg:text-base text-xs font-semibold flex items-center lg:space-x-2 space-x-1">
                    <span>{name}</span>
                  </span>{" "}
                </div>
              ) : (
                <div className="flex items-center lg:space-x-3 space-x-2">
                  <img
                    src="https://i.ibb.co.com/1z7P2wJ/girl2.jpg"
                    alt=""
                    className="w-12 rounded-full bg-white p-1"
                  />
                  <span className="text-gray-500 lg:text-base text-xs font-semibold flex items-center lg:space-x-2 space-x-1"></span>
                  <span>{name}</span>
                </div>
              )}
            </div>
          </div>
          <div className="">
            <p className="text-gray-500 lg:text-base text-xs font-semibold lg:flex items-center lg:space-x-2 space-x-4 border-l-4 border-indigo-400 pl-2 rounded-md shadow-green-500">
              <span className="">{content}</span>
            </p>

            <p className="text-gray-500 lg:text-base text-xs font-semibold flex items-center lg:space-x-2 space-x-1">
              <span>Published on:</span> <FaClock className="" />
              <span>{formattedDate}</span>
            </p>
            {/* Nested comment reply form begins */}
            <div className="lg:max-w-sm">
              {replyingTo === comment._id && (
                <ReplyToCommentForm
                  parentId={comment._id}
                  slug={slug}
                  onDataChanged={onDataChanged}
                  onCancel={() => setReplyingTo(null)}
                />
              )}
            </div>

            {/* Nested comment reply form ends */}
          </div>
          <div className="lg:flex items-center lg:space-x-4 space-x-2 lg:py-2 py-1">
            <CTAButton
              onClick={() => openModal(comment)}
              label={isEditing ? "Editing..." : "Edit"}
              disabled={isEditing}
              icon={<FaEdit />}
              className="lg:btn-xs lg:text-xs btn-xs rounded-lg text-xs transition-all duration-200 ease-in-out transform hover:scale-105 hover:brightness-90"
            />
            <CTAButton
              onClick={() => handleDeleteComment(comment._id)}
              label={isDeleting ? "Deleting..." : "Delete"}
              type="submit"
              icon={
                isDeleting ? (
                  <span className="loading loading-ring loading-sm"></span>
                ) : (
                  <FaTrash />
                )
              }
              disabled={isDeleting}
              variant="danger"
              className="lg:btn-xs lg:text-xs btn-xs rounded-lg text-xs transition-all duration-200 ease-in-out transform hover:scale-105 hover:brightness-90"
            />
            <div className="p-[2px]">
              {comment.level < 2 && (
                <button
                  onClick={() => setReplyingTo(comment._id)}
                  className="btn btn-xs shadow-md bg-purple-600 text-white transition-all duration-200 ease-in-out transform hover:scale-105 hover:brightness-90"
                >
                  <FaReply /> Reply {comment.level}
                </button>
              )}
            </div>
          </div>

          {/* Nested Replies */}
          {comment.replies?.length > 0 && comment.level < 2 && (
            <div className="ml-8 border-l-2 border-gray-300 pl-3 space-y-3">
              {comment.replies.map((reply, index) => (
                <CommentCard
                  key={reply._id}
                  comment={reply}
                  index={index}
                  slug={slug}
                  replyingTo={replyingTo}
                  setReplyingTo={setReplyingTo}
                  onDataChanged={onDataChanged}
                  openModal={openModal}
                  handleDeleteComment={handleDeleteComment}
                  isDeleting={isDeleting}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal section begins */}
      {isOpen && modalData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-2xl w-full">
            {/* Edit comment header begins */}
            <div className="lg:my-4 my-2">
              <h2 className="font-bold lg:text-2xl text-xl flex items-center">
                <FaCommentAlt className="mr-1" />{" "}
                {editingMode ? "Edit Comment" : "Add Comment"}
              </h2>
            </div>
            {/* Edit comment header ends */}

            <div className="my-2 mt-2 p-2 border rounded">
              <div className="bg-gray-100 p-2 rounded-md space-y-3 text-sm">
                {/* Edit comment form begins */}
                <div className="">
                  <div className="font-bold text-gray-900 border-b border-dashed border-gray-300 mb-1 flex items-center text-xl">
                    <div className="h">
                      <form
                        action=""
                        onSubmit={handleSubmitComment}
                        className="lg:space-y-3 space-y-2"
                      >
                        <input
                          type="text"
                          name="name"
                          value={commentData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          className="input input-bordered w-full"
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500">{errors.name}</p>
                        )}
                        <input
                          type="email"
                          value={commentData.email}
                          onChange={handleChange}
                          name="email"
                          placeholder="Your Email"
                          className="input input-bordered w-full"
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                        <textarea
                          className="textarea w-full"
                          name="content"
                          value={commentData.content}
                          onChange={handleChange}
                          type="text"
                          id=""
                          rows="4"
                          cols="50"
                          placeholder="Your Comment"
                        ></textarea>
                        {errors.content && (
                          <p className="text-sm text-red-500">
                            {errors.content}
                          </p>
                        )}

                        <div className="flex items-center space-x-4 mt-4">
                          <CTAButton
                            label={isEditing ? "Editing..." : "Edit comment"}
                            disabled={isEditing}
                            type="submit"
                            icon={editingMode ? <FaEdit /> : <FaPlusCircle />}
                            variant="primary"
                            className="btn text-sm btn-sm rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:brightness-90"
                          />

                          <CTAButton
                            label="Cancel"
                            onClick={handleCancelEdit}
                            icon={<FaArrowAltCircleRight />}
                            variant="secondary"
                            className="btn  text-sm btn-sm rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:brightness-90"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* Edit comment form ends */}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="btn btn-sm mt-1 hover:bg-red-600 hover:text-gray-200 bg-red-500 text-white rounded flex items-center shadow-md"
              >
                <FaTimes className="mr-1" /> Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal section ends */}
    </div>
  );
};

export default CommentCard;
