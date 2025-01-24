import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { createTag, updateTag } from "../../adminServices/tagService";
import {
  notifyError,
  notifySuccess,
} from "../../adminComponent/adminToastNotification/AdminToastNotification";
import { useEffect, useState } from "react";

import CTAButton from "../../../components/buttons/CTAButton";
import useAdminTag from "../../adminHooks/useAdminTag";

const TagForm = ({ onSuccess, existingTag = null }) => {
  const [tagName, setTagName] = useState(existingTag?.name || "");
  const [slug, setSlug] = useState(existingTag?.slug || "");

  const { addTagToState, updateTagInState } = useAdminTag();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingTag) {
      setTagName(existingTag.name);
      setSlug(existingTag.slug);
    } else {
      setTagName("");
      setSlug("");
    }
  }, [existingTag]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tagName.trim()) {
      notifyError("Tag name is required.");
      return;
    }
    if (!slug.trim()) {
      notifyError("Tag slug is required.");
      return;
    }

    try {
      setLoading(true);
      const tagData = {
        name: tagName,
        slug: slug,
      };

      if (existingTag) {
        // Update tag
        const updatedTag = await updateTag(existingTag._id, tagData);
        updateTagInState(updatedTag);
        notifySuccess("Tag updated successfully!");
      } else {
        // Create tag
        const newTag = await createTag(tagData);
        addTagToState(newTag);
        notifySuccess("Tag created successfully!");
      }

      onSuccess();
      setTagName("");
      setSlug("");
    } catch (error) {
      console.error("Error in creating/updating tag.", error);
      notifyError("Error in creating/updating tag.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2">Tag Name:</label>
          <input
            type="text"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            className="input input-bordered input-sm w-full dark:bg-gray-700"
            // required
          />
          <label className="block mb-2">Slug:</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="input input-bordered input-sm w-full dark:bg-gray-700"
            // required
          />
        </div>

        <CTAButton
          label={
            loading ? "Saving..." : existingTag ? "Update Tag" : "Create Tag"
          }
          disabled={loading}
          className="btn btn-sm mt-4"
          icon={existingTag ? <FaEdit /> : <FaPlusCircle />}
          variant={existingTag ? "success" : "primary"}
        />
      </form>
    </div>
  );
};

export default TagForm;
