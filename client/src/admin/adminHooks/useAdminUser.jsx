import AdminUserContext from "../adminContexts/AdminUserContext";
import { useContext } from "react";

const useAdminUser = () => {
  const context = useContext(AdminUserContext);
  if (context === undefined) {
    throw new Error("useAdminUser must be used within an AdminUserProvider");
  }
  return context;
};

export default useAdminUser;
