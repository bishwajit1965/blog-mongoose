import { useEffect, useState } from "react";

import AdminCategoryContext from "../adminContexts/AdminCategoryContext";
import { getAllCategories } from "../adminServices/categoryService";

const AdminCategoryProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const categoryData = await getAllCategories();
      setCategories(categoryData);
    } catch (error) {
      console.error("Error in fetching categories.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategoryToState = (category) => {
    setCategories((prev) => [...prev, category]);
  };

  const updateCategoryInState = (updatedCategory) => {
    setCategories((prev) =>
      prev.map((category) =>
        category._id === updatedCategory._id ? updatedCategory : category
      )
    );
  };

  const adminCategoryInfo = {
    loading,
    categories,
    fetchCategories,
    addCategoryToState,
    updateCategoryInState,
  };

  return (
    <AdminCategoryContext.Provider value={adminCategoryInfo}>
      {children}
    </AdminCategoryContext.Provider>
  );
};

export default AdminCategoryProvider;
