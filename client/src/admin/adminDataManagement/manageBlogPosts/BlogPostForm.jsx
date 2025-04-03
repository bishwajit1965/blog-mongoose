import {
  FaEdit,
  FaExchangeAlt,
  FaExpandArrowsAlt,
  FaPlusCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { createBlog, updateBlogBySlug } from "../../adminServices/blogService";
import {
  notifyError,
  notifySuccess,
} from "../../adminComponent/adminToastNotification/AdminToastNotification";
import { useEffect, useMemo, useRef, useState } from "react";

import CTAButton from "../../../components/buttons/CTAButton";
import RichTextEditor from "../../adminComponent/richTextEditor/RichTextEditor";
import Select from "react-select";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import useBlogContentLimit from "../../adminHooks/useBlogContentLimit";
import useExcerpt from "../../adminHooks/useExcerpt";

const BlogPostForm = ({
  existingBlog,
  categories,
  tags,
  onSuccess,
  isHidden,
  toggler,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const { adminData, hasPermission } = useAdminAuth();
  const [authorName, setAuthorName] = useState("");
  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const fileInputRef = useRef();

  const {
    excerpt,
    handleExcerptChange,
    remaining,
    progressPercent,
    progressBarStyle,
    counterStyle,
  } = useExcerpt(500, existingBlog?.excerpt || "");

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
      excerpt: "",
      author: "",
      category: "",
      tags: [],
      image: "",
      status: "draft",
      imageFile: null,
      publishAt: null,
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
    excerpt: "",
    author: "",
    category: "",
    tags: [],
    image: "",
    imageFile: null,
    status: "draft",
    publishAt: "",
    wordCount: 0, // ✅ Add this
    selectedLength: "300-600", // ✅ Add this (default range)
  });

  const {
    content,
    selectedLength,
    wordCount,
    progress,
    progressBarColor,
    handleContentChange,
    handleSelectChange,
  } = useBlogContentLimit(existingBlog?.content || "", 3000);

  useEffect(() => {
    const wordRanges = {
      "300-600": { min: 300, max: 600 },
      "600-1200": { min: 600, max: 1200 },
      "1200-2000": { min: 1200, max: 2000 },
      "2000-3000": { min: 2000, max: 3000 },
    };

    if (existingBlog) {
      const blogWordCount = existingBlog.content
        ? existingBlog.content.trim().split(/\s+/).length
        : 0;

      const detectedRange =
        Object.keys(wordRanges).find((range) => {
          const { min, max } = wordRanges[range];
          return blogWordCount >= min && blogWordCount <= max;
        }) || "300-600"; // Default if no match found

      setFormData({
        title: existingBlog.title || "",
        content: existingBlog.content || "",
        excerpt: existingBlog.excerpt || "",
        author: adminData.user?._id || "",
        category: existingBlog.category._id || "",
        tags: existingBlog.tags?.map((tag) => tag._id) || [],
        image: existingBlog.image || "",
        status: existingBlog.status || "draft",
        imageFile: null,
        publishAt: existingBlog.publishAt || null,
        wordCount: blogWordCount, // ✅ Fix: Use calculated word count
        selectedLength: detectedRange, // ✅ Fix: Select range dynamically
      });

      setImagePreview(
        existingBlog.image ? `${apiURL}${existingBlog.image}` : null
      );

      if (Array.isArray(existingBlog.tags) && existingBlog.tags.length > 0) {
        setSelectedTags(
          existingBlog.tags
            .filter((tag) => tag && tag._id && tag.name)
            .map((tag) => ({
              value: tag._id,
              label: tag.name,
            }))
        );
      } else {
        setSelectedTags([]);
      }

      setAuthorName(existingBlog.author?.name || "");
    } else {
      setFormData({
        title: "",
        content: "",
        excerpt: "",
        author: "",
        category: "",
        tags: [],
        image: "",
        status: "draft",
        imageFile: null,
        publishAt: null,
        wordCount: 0,
        selectedLength: "300-600",
      });

      setSelectedTags([]);
      setImagePreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      handleCancelCreateBlog();
    }
  }, [existingBlog, tags, tagOptions, apiURL, adminData.user._id]);

  const handleChange = (e) => {
    if (e.target.value.length <= 500) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
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
      if (!file.type.startsWith("image/")) {
        notifyError("Only image files are allowed!");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        notifyError("File size should not exceed 5MB.");
        return;
      }
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
      formDataToSend.append("content", content);
      formDataToSend.append("wordCount", wordCount);
      formDataToSend.append("selectedLength", selectedLength);
      formDataToSend.append("excerpt", formData.excerpt);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("category", formData.category);
      formData.tags.forEach((tag) => formDataToSend.append("tags", tag));
      formDataToSend.append("status", formData.status);

      if (formData.imageFile) {
        formDataToSend.append("image", formData.imageFile);
      }

      if (
        formData.status === "scheduled" ||
        (formData.status === "coming-soon" && formData.publishAt)
      ) {
        formDataToSend.append("publishAt", formData.publishAt);
      }

      if (existingBlog) {
        if (hasPermission("edit-post")) {
          await updateBlogBySlug(existingBlog.slug, formDataToSend);
          console.log("Sent data to update:", formData.content);
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
    <div className="mt-[-15px] relative mb-2">
      <form
        onSubmit={handleSubmit}
        className="p-2 rounded-lg shadow-md"
        encType="multipart/form-data pb-2"
      >
        {/* Image Preview to be updated with the existing one*/}
        <div className="mb-2 mt-2">
          {imagePreview && (
            <img
              src={imagePreview}
              alt={formData.title}
              className={`${
                isHidden ? "h-96" : "h-60"
              } w-full  object-cover rounded-md shadow-sm mb-2`}
              loading="lazy" // Lazy load the image    "w-full h-64 object-cover rounded-t-md"
            />
          )}
        </div>

        <div className="mb-2">
          <label className="block text-xs font-bold text-gray-500">
            Title:
          </label>
          <input
            name="title"
            placeholder="Title..."
            value={formData.title}
            onChange={handleChange}
            required
            className="input input-bordered input-sm w-full max-w-full dark:bg-gray-700"
          />
        </div>

        <div className="mb-2 rounded-md shadow-md">
          <div className="mt-2">
            <RichTextEditor
              content={content}
              onContentChange={handleContentChange}
              wordCount={wordCount}
              progress={progress}
              progressBarColor={progressBarColor}
              selectedLength={selectedLength}
              onSelectChange={handleSelectChange}
            />
          </div>
        </div>

        <div className="mb-2">
          <div className="mt-2">
            <label className="block text-red-400 text-xs font-bold mb-[2px]">
              Excerpt(Optional)
            </label>
            <textarea
              name="excerpt"
              id="excerpt"
              rows={2}
              value={excerpt}
              maxLength={500}
              onChange={(e) => {
                handleExcerptChange(e);
                setFormData({ ...formData, excerpt: e.target.value });
              }}
              className="textarea input-bordered w-full mb-1 dark:bg-gray-700"
              placeholder="Excerpt for the blog post..."
            />

            {/* Progress Bar */}
            <div className="bg-gray-100 rounded-b shadow-sm border mt-[-6px] dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200">
              <div className="progress-bar bg-gray-200 h-2.5 w-full">
                <div className="h-2.5 rounded" style={progressBarStyle}></div>
              </div>

              {/* Character Counter and Percentage */}
              <div
                className="text-rights flex justify-between items-center text-sm mt-1 h-6 dark:text-gray-200"
                style={counterStyle}
              >
                <div className="">Counter:</div>
                <div className="h-4 dark:text-gray-200 px-2">
                  {remaining} characters left || {progressPercent}% used
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-2">
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
        </div>

        {/* React-Select Multi-Select for Tags */}
        <div className="mb-2">
          <label className="block text-xs font-bold text-gray-500">Tags:</label>
          <Select
            isMulti
            options={tagOptions}
            onChange={handleTagChange}
            value={selectedTags}
            className="mb-1 p-0 dark:bg-gray-700"
          />
        </div>

        {/* Image upload */}
        <div className="mb-2">
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
        </div>

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
              <option value="coming-soon">Coming Soon</option>
              <option value="scheduled">Will Publish At</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 justify-between gap-2 mb-2">
          <div className="lg:col-span-12 col-span-12">
            {/* Show DateTime Input Only if 'coming-soon' is Selected */}
            {formData.status === "coming-soon" && (
              <div className="lg:col-span-6 col-span-12">
                <label className="block text-xs font-bold text-gray-500">
                  Coming Soon Date:
                </label>
                <input
                  type="datetime-local"
                  name="publishAt"
                  value={formData.publishAt || ""}
                  onChange={handleChange}
                  required={formData.status === "coming-soon"} // Make it required only for scheduled posts
                  className="input input-sm input-bordered w-full max-w-full dark:bg-gray-700"
                />
              </div>
            )}
            {/* Show DateTime Input Only if 'scheduled' is Selected */}
            {formData.status === "scheduled" && (
              <div className="lg:col-span-12 col-span-12">
                <label className="block text-xs font-bold text-gray-500">
                  Schedule Publish Date:
                </label>
                <input
                  type="datetime-local"
                  name="publishAt"
                  value={formData.publishAt || ""}
                  onChange={handleChange}
                  required={formData.status === "scheduled"} // Make it required only for scheduled posts
                  className="input input-sm input-bordered w-full max-w-full dark:bg-gray-700"
                />
              </div>
            )}
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
                formData.excerpt !== "" ||
                formData.category !== "" ||
                formData.status !== "draft" ||
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

export default BlogPostForm;
