import { useContext } from "react";
import AdminPageContext from "../adminProviders/data/AdminPageContext";

const useAdminPage = () => {
  const context = useContext(AdminPageContext);
  if (context === undefined) {
    throw new Error("useAdminPage must be used within an AdminPageProvider");
  }
  return context;
};

export default useAdminPage;
