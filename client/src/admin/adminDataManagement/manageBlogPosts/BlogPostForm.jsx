import { FaEdit, FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import { createBlog, updateBlogBySlug } from "../../adminServices/blogService";
import {
  notifyError,
  notifySuccess,
} from "../../adminComponent/adminToastNotification/AdminToastNotification";
import { useEffect, useMemo, useRef, useState } from "react";

import CTAButton from "../../../components/buttons/CTAButton";
import Select from "react-select";
import useAdminAuth from "../../adminHooks/useAdminAuth";

const BlogPostForm = ({ existingBlog, categories, tags, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const { adminData, hasPermission } = useAdminAuth();
  const [authorName, setAuthorName] = useState("");
  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const fileInputRef = useRef();

  const tagOptions = useMemo(
    () =>
      tags.map((tag) => ({
        value: tag._id,
        label: tag.name,
      })),
    [tags]
  );

  const handleCancelCreateBlog = () => {
    setFormData({
      title: "",
      content: "",
      author: "",
      category: "",
      tags: [],
      image: "",
      status: "draft",
      imageFile: null,
    });
    setImagePreview(null);
    setSelectedTags(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    tags: [],
    image: "",
    imageFile: null,
    status: "draft",
  });

  useEffect(() => {
    if (existingBlog) {
      setFormData({
        title: existingBlog.title || "",
        content: existingBlog.content || "",
        author: adminData.user?._id || "",
        category: existingBlog.category._id || "",
        tags: existingBlog.tags?.map((tag) => tag._id) || [],
        image: existingBlog.image || [],
        status: existingBlog.status || "draft",
      });
      console.log("Existing image URL:", existingBlog.image); // Debugging log

      setImagePreview(
        existingBlog.image ? `${apiURL}${existingBlog.image}` : null
      );

      if (Array.isArray(existingBlog.tags) && existingBlog.tags.length > 0) {
        setSelectedTags(
          existingBlog.tags
            .filter((tag) => tag && tag._id && tag.name) // Ensures tag has valid data
            .filter(Boolean)
            .map((tag) => ({
              value: tag._id,
              label: tag.name,
            }))
        );
      } else {
        setSelectedTags([]);
      }
      setAuthorName(existingBlog.author?.name || ""); // Display name in UI
    } else {
      setFormData({
        title: "",
        content: "",
        author: "",
        category: "",
        tags: [],
        image: "",
        status: "draft",
        imageFile: null,
      });
      setSelectedTags([]);
      setImagePreview(null);

      // Reset file input field
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      handleCancelCreateBlog(); // Use the reset function
    }
  }, [existingBlog, tags, tagOptions, apiURL, adminData.user._id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
    setFormData({
      ...formData,
      tags: selectedOptions.map((option) => option.value.toString()),
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file); // Debugging log
    if (file) {
      setFormData({ ...formData, imageFile: file });
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("New image preview:", reader.result); // Debugging log
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send form data to the server
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("category", formData.category);
      formData.tags.forEach((tag) => formDataToSend.append("tags", tag));
      formDataToSend.append("status", formData.status);

      if (formData.imageFile) {
        formDataToSend.append("image", formData.imageFile);
      }
      if (existingBlog) {
        if (hasPermission("edit-post")) {
          await updateBlogBySlug(existingBlog.slug, formDataToSend);
          notifySuccess("Blog post updated successfully!");
        } else {
          notifyError("You do not have permission to edit a blog post.");
        }
      } else {
        if (hasPermission("create-post")) {
          await createBlog(formDataToSend);
          notifySuccess("Blog post created successfully!");
        } else {
          notifyError("Error in creating blog post.");
        }
      }
      onSuccess();
    } catch (error) {
      console.error("Error in creating/updating permission.", error);
      notifyError("Error in creating/updating permission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {adminData.user?._id}
      <form
        onSubmit={handleSubmit}
        className="p-2 bg-gray- rounded-lg shadow-md"
        encType="multipart/form-data"
      >
        {/* Image Preview to be updated with the existing one*/}
        {imagePreview && (
          <img
            src={imagePreview}
            alt={formData.title}
            className="mb-1 w-full h-auto object-cover rounded-md"
          />
        )}
        <label className="block text-xs font-bold text-gray-500">Title:</label>
        <input
          name="title"
          placeholder="Title..."
          value={formData.title}
          onChange={handleChange}
          required
          className="mb-1 input input-bordered input-sm w-full max-w-full dark:bg-gray-700"
        />
        <label className="block text-xs font-bold text-gray-500">
          Content:
        </label>
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
          className="textarea input-bordered w-full mb-1 dark:bg-gray-700"
        />

        <label className="block text-xs font-bold text-gray-500">
          Category:
        </label>
        <select
          name="category"
          onChange={handleChange}
          required
          value={formData.category}
          defaultValue="Small"
          className="select select-sm input-bordered w-full max-w-full mb-1 dark:bg-gray-700"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* React-Select Multi-Select for Tags */}
        <label className="block text-xs font-bold text-gray-500">Tags:</label>
        <Select
          isMulti
          options={tagOptions}
          onChange={handleTagChange}
          value={selectedTags}
          className="mb-1 p-0 dark:bg-gray-700"
        />

        {/* Image upload */}
        <label className="block text-xs font-bold text-gray-500">
          Upload Image:
        </label>
        <input
          type="file"
          ref={fileInputRef} // Attach the ref here
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-1 file-input file-input-bordered file-input-sm w-full max-w-full dark:bg-gray-700"
        />

        <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 justify-between mb-2">
          {/* Post Status */}
          <div className="lg:col-span-6 col-span-12">
            {existingBlog ? (
              <div className="">
                <label className="block text-xs font-bold text-gray-500">
                  Post Author:
                </label>
                <input
                  name=""
                  placeholder="Author..."
                  value={authorName}
                  readOnly
                  className="mb-1 input input-bordered input-sm w-full max-w-full dark:bg-gray-700"
                />
              </div>
            ) : (
              <div className="">
                <label className="block text-xs font-bold text-gray-500">
                  Post Author:
                </label>
                <input
                  name="author"
                  placeholder="Author..."
                  value={adminData.user._id}
                  onChange={handleChange}
                  readOnly
                  required
                  className="mb-1 input input-bordered input-sm w-full max-w-full dark:bg-gray-700"
                />
              </div>
            )}
          </div>
          <div className="lg:col-span-6 col-span-12">
            <label className="block text-xs font-bold text-gray-500">
              Post status:
            </label>
            <select
              name="status"
              onChange={handleChange}
              value={formData.status}
              defaultValue="Small"
              className="select select-sm input-bordered w-full max-w-full dark:bg-gray-700"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="">
            <CTAButton
              label={
                loading
                  ? "Saving..."
                  : existingBlog
                  ? "Update Blog"
                  : "Create Blog"
              }
              disabled={loading}
              className="btn btn-sm"
              icon={existingBlog ? <FaEdit /> : <FaPlusCircle />}
              variant={existingBlog ? "success" : "primary"}
            />
          </div>
          <div className="">
            {existingBlog && (
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
          <div className="">
            {!existingBlog &&
              (formData.title !== "" ||
                formData.content !== "" ||
                formData.category !== "" ||
                formData.tags.length > 0 ||
                formData.imageFile !== null) && (
                <div className="">
                  <CTAButton
                    onClick={handleCancelCreateBlog}
                    label="Cancel Blog Upload"
                    className="btn btn-sm"
                    variant="warning"
                    icon={<FaTimesCircle />}
                  />
                </div>
              )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogPostForm;
