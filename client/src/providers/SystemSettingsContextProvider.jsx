import { useCallback, useEffect, useState } from "react";
import SystemSettingsContext from "../contexts/SystemSettingsContext";
import { getPublicSystemSettings } from "../services/systemSettingsApiService";

let hasFetchedPublicSystemSettings = false;

const SystemSettingsContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(null);

  const fetchSystemSettings = useCallback(async () => {
    if (hasFetchedPublicSystemSettings) return;
    hasFetchedPublicSystemSettings = true;

    try {
      setLoading(true);
      const [settingsResponse] = await Promise.all([getPublicSystemSettings()]);
      if (settingsResponse?.settings) {
        setSettings(settingsResponse?.settings);
      } else {
        setSettings(settingsResponse || null);
      }
    } catch (error) {
      console.error("Error in fetching system settings", error);
      setSettings(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSystemSettings();
  }, [fetchSystemSettings]);

  const systemSettingsInfo = {
    loading,
    settings,
    systemSettings: settings,
  };

  return (
    <SystemSettingsContext.Provider value={systemSettingsInfo}>
      {children}
    </SystemSettingsContext.Provider>
  );
};

export default SystemSettingsContextProvider;
