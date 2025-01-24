import AdminLoader from "../../adminComponent/adminLoader/AdminLoader";
import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import CTAButton from "../../../components/buttons/CTAButton";
import CategoriesTable from "./CategoriesTable";
import CategoryForm from "./CategoryForm";
import { FaTimesCircle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import useAdminCategory from "../../adminHooks/useAdminCategory";
import { useState } from "react";

const ManageCategories = () => {
  const { categories, fetchCategories, loading } = useAdminCategory();

  const [editingCategory, setEditingCategory] = useState(null);

  const handleEdit = (category) => {
    setEditingCategory(category);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };
  return (
    <div>
      <Helmet>
        <title>Blog || Manage Categories</title>
      </Helmet>

      <AdminSubTitle
        dataLength={categories.length}
        subTitle="Manage"
        decoratedText="Categories"
      />

      <div className="p-2">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 grid-cols-1 md:grid-cols-2 gap-4">
            <div className="lg:col-span-6 col-span-12 lg:border-r dark:border-gray-700 lg:pr-3">
              <h2 className="text-xl font-semibold mb-2">
                {editingCategory ? "Update Permission" : "Add Permission"}
              </h2>
              <CategoryForm
                onSuccess={() => {
                  fetchCategories(); //Not needed as dynamic update works
                  handleCancelEdit();
                }}
                existingCategory={editingCategory}
              />

              {editingCategory && (
                <>
                  <CTAButton
                    onClick={handleCancelEdit}
                    label="Cancel Edit"
                    className="btn btn-sm mt-2"
                    variant="warning"
                    icon={<FaTimesCircle />}
                  />
                </>
              )}
            </div>
            <div className="lg:col-span-6 col-span-12">
              <h2 className="text-xl font-semibold mb-2">
                Existing Categories
              </h2>
              {loading ? (
                <AdminLoader />
              ) : (
                <CategoriesTable
                  categories={categories}
                  onEdit={handleEdit}
                  onDelete={fetchCategories} // Handles deletion and reload
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
