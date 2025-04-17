import {
  FaEdit,
  FaExchangeAlt,
  FaExpandArrowsAlt,
  FaPlusCircle,
  FaTimesCircle,
} from "react-icons/fa";
import {
  createNotification,
  updateNotification,
} from "../../adminServices/notificationApiService";
import {
  notifyError,
  notifySuccess,
} from "../../adminComponent/adminToastNotification/AdminToastNotification";
import { useEffect, useState } from "react";

import CTAButton from "../../../components/buttons/CTAButton";
import useAdminAuth from "../../adminHooks/useAdminAuth";

const AdminNotificationForm = ({
  existingNotice,
  onSuccess,
  isHidden,
  toggler,
}) => {
  const { adminData, hasPermission } = useAdminAuth();

  const [formData, setFormData] = useState({
    title: "",
    heading: "",
    subject: "",
    author: "",
    content: "",
  });

  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingNotice) {
      setFormData({
        title: existingNotice.title || "",
        heading: existingNotice.heading || "",
        subject: existingNotice.subject || "",
        author: existingNotice.author || "",
        content: existingNotice.content || "",
      });
    } else {
      setFormData({
        title: "",
        heading: "",
        subject: "",
        author: "",
        content: "",
      });
    }
  }, [existingNotice]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const uploadData = new FormData();
      uploadData.append("title", formData.title);
      uploadData.append("heading", formData.heading);
      uploadData.append("subject", formData.subject);
      uploadData.append("author", formData.author);
      uploadData.append("content", formData.content);
      if (pdfFile) {
        uploadData.append("file", pdfFile);
      }

      if (existingNotice) {
        if (hasPermission("update-notification")) {
          await updateNotification(existingNotice._id, uploadData);
          console.log("Sent data to update:", formData.content);
          notifySuccess("Notice updated successfully!");
        } else {
          notifyError("You do not have permission to update notification.");
        }
      } else {
        if (hasPermission("create-notification")) {
          await createNotification(uploadData);
          notifySuccess("Notice created successfully!");
        } else {
          notifyError("Error in creating notification.");
        }
      }
    } catch (error) {
      console.error("Error in creating/updating notification.", error);
      notifyError("Error in creating/updating notification.");
    } finally {
      setLoading(false);
      onSuccess();
    }
  };
  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="p-2 rounded shadow bg-white dark:bg-gray-800 max-w-full mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4">
          {adminData.user.name} ||{" "}
          {existingNotice ? "Update Notification" : " Create Notification"}
        </h2>
        <div className="mb-4">
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Notice title..."
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Heading</label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            placeholder="Notice heading..."
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Notice subject..."
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author of notice..."
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Message</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Notice content..."
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Attach PDF (optional)</label>
          <input
            type="file"
            name="file"
            accept="application/pdf"
            onChange={handlePdfChange}
            value={formData.pdfUrl}
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="">
            <CTAButton
              label={
                loading
                  ? "Saving..."
                  : existingNotice
                  ? "Update Notice"
                  : "Create Notice"
              }
              disabled={loading}
              className="btn btn-sm"
              icon={existingNotice ? <FaEdit /> : <FaPlusCircle />}
              variant={existingNotice ? "success" : "primary"}
            />
          </div>
          {existingNotice && (
            <div className="">
              <CTAButton
                onClick={onSuccess}
                label="Cancel Edit"
                className="btn btn-sm"
                variant="warning"
                icon={<FaTimesCircle />}
              />
            </div>
          )}
        </div>
      </form>
      <div className="absolute bottom-[8px] right-2">
        <CTAButton
          onClick={() => toggler()}
          label={!isHidden ? "Expand View" : "Shrink View"}
          icon={!isHidden ? <FaExpandArrowsAlt /> : <FaExchangeAlt />}
          variant="primary"
          className="btn btn-sm invisible lg:visible"
        />
      </div>
    </div>
  );
};

export default AdminNotificationForm;
