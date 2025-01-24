import AdminCategoryContext from "../adminContexts/AdminCategoryContext";
import { useContext } from "react";

const useAdminCategory = () => {
  const context = useContext(AdminCategoryContext);
  if (context === undefined) {
    throw new Error(
      "useAdminCategory must be used within an AdminCategoryProvider"
    );
  }
  return context;
};

export default useAdminCategory;
