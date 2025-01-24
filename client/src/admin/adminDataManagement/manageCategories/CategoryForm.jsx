import { FaEdit, FaPlusCircle } from "react-icons/fa";
import {
  createCategory,
  updateCategory,
} from "../../adminServices/categoryService";
import {
  notifyError,
  notifySuccess,
} from "../../adminComponent/adminToastNotification/AdminToastNotification";
import { useEffect, useState } from "react";

import CTAButton from "../../../components/buttons/CTAButton";
import useAdminCategory from "../../adminHooks/useAdminCategory";

const CategoryForm = ({ onSuccess, existingCategory = null }) => {
  const [categoryName, setCategoryName] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { addCategoryToState, updateCategoryInState } = useAdminCategory();

  useEffect(() => {
    if (existingCategory) {
      setCategoryName(existingCategory.name);
      setCategoryDescription(existingCategory.description);
      setSlug(existingCategory.slug);
    } else {
      setCategoryName("");
      setCategoryDescription("");
      setSlug("");
    }
  }, [existingCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      notifyError("Category name is required.");
      return;
    }
    if (!slug.trim()) {
      notifyError("Slug is required.");
      return;
    }
    if (!categoryDescription.trim()) {
      notifyError("Category description is required.");
      return;
    }

    try {
      setLoading(true);
      const categoryData = {
        name: categoryName,
        slug: slug,
        description: categoryDescription,
      };
      if (existingCategory) {
        const updatedCategory = await updateCategory(
          existingCategory._id,
          categoryData
        );
        updateCategoryInState(updatedCategory);
        notifySuccess("Category updated successfully!");
      } else {
        const newCategory = await createCategory(categoryData);
        addCategoryToState(newCategory);
        notifySuccess("Category created successfully!");
      }
      onSuccess();
      setCategoryName("");
      setCategoryDescription("");
      setSlug("");
    } catch (error) {
      console.error("Error in creating/updating permission.", error);
      notifyError("Error in creating/updating permission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2">Category Name:</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="input input-bordered input-sm w-full dark:bg-gray-700"
            // required
          />

          <label className="block mb-2">Category Slug:</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="input input-bordered input-sm w-full dark:bg-gray-700"
            // required
          />

          <label className="block mb-2">Category Description:</label>
          <input
            type="text"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            className="input input-bordered input-sm w-full dark:bg-gray-700"
            // required
          />
        </div>

        <CTAButton
          label={
            loading
              ? "Saving..."
              : existingCategory
              ? "Update Category"
              : "Create Category"
          }
          disabled={loading}
          className="btn btn-sm mt-4"
          icon={existingCategory ? <FaEdit /> : <FaPlusCircle />}
          variant={existingCategory ? "success" : "primary"}
        />
      </form>
    </div>
  );
};

export default CategoryForm;
