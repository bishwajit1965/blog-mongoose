import { useContext } from "react";
import PublicDataContext from "./PublicDataContext";

const usePublicData = () => {
  const context = useContext(PublicDataContext);
  if (context === undefined) {
    throw new Error("usePublicData must be used within an PublicDataProvider");
  }
  return context;
};

export default usePublicData;
