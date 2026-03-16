import AdminTagContext from "../adminProviders/data/AdminTagContext";
import { useContext } from "react";

const useAdminTag = () => {
  const context = useContext(AdminTagContext);
  if (context === undefined) {
    throw new Error("useAdminTag must be used within an AdminTagProvider");
  }
  return context;
};

export default useAdminTag;
