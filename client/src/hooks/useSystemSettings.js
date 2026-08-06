import { useContext } from "react";
import SystemSettingsContext from "../contexts/SystemSettingsContext";

const useSystemSettings = () => {
  const context = useContext(SystemSettingsContext);
  if (!context) {
    throw new Error(
      "useSystemSettingsContext must be used in SystemSettingsContextProvider",
    );
  }
  return context;
};

export default useSystemSettings;
