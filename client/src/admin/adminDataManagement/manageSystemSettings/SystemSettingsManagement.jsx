import { useCallback, useEffect, useState } from "react";
import {
  getSystemSettings,
  updateSystemSettings,
} from "../../../services/systemSettingsApiService";

import {
  notifyError,
  notifySuccess,
} from "../../adminComponent/adminToastNotification/AdminToastNotification";
import SiteInformation from "./SiteInformation";
import BrandingSettings from "./BrandingSettings";
import SeoSettings from "./SeoSettings";
import ContactSettings from "./ContactSettings";
import Button from "../../ui/Button";
import { LucideIcon } from "../../lib/LucideIcons";
import SocialSettings from "./SocialSettings";
import FeatureSettings from "./FeatureSettings";
import LocalizationSettings from "./LocalizationSettings";

/**=============================================
 * For the toggling of React Multi Select fields
 * @param {*} dark
 * @returns
 *=============================================*/
const customStyles = (dark) => ({
  control: (provided) => ({
    ...provided,
    backgroundColor: dark ? "#1e293b" : "#ffffff",
    borderColor: dark ? "#334155" : "#d1d5db",
    color: dark ? "#e5e7eb" : "#111827",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: dark ? "#1e293b" : "#ffffff",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? dark
        ? "#334155"
        : "#e5e7eb"
      : dark
        ? "#1e293b"
        : "#ffffff",
    color: dark ? "#e5e7eb" : "#111827",
    cursor: "pointer",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: dark ? "#334155" : "#e5e7eb",
  }),

  multiValueLabel: (provided) => ({
    ...provided,
    color: dark ? "#e5e7eb" : "#111827",
  }),

  multiValueRemove: (provided) => ({
    ...provided,
    color: dark ? "#e5e7eb" : "#111827",
    ":hover": {
      backgroundColor: "#ef4444",
      color: "white",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: dark ? "#e5e7eb" : "#111827",
  }),

  placeholder: (provided) => ({
    ...provided,
    color: dark ? "#94a3b8" : "#6b7280",
  }),

  singleValue: (provided) => ({
    ...provided,
    color: dark ? "#e5e7eb" : "#111827",
  }),
});

const SystemSettingsManagement = () => {
  const [loading, setLoading] = useState(false);
  const [systemSettings, setSystemSettings] = useState(null);

  console.log("System Settings", systemSettings);

  const [formData, setFormData] = useState({
    site: {},
    branding: {},
    seo: {},
    contact: {},
    socialLinks: {},
    features: {},
    localization: {},
  });

  const fetchSystemSettings = useCallback(async () => {
    try {
      setLoading(true);
      const [settingsResponse] = await Promise.all([getSystemSettings()]);
      if (settingsResponse) {
        const settings = settingsResponse?.data || null;
        setSystemSettings(settings);
        setFormData(settings);
        notifySuccess(
          settingsResponse?.message || "Settings fetched successfully.",
        );
      }
    } catch (error) {
      notifyError(
        error.response?.data?.message || "Could not load system settings.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSystemSettings();
  }, [fetchSystemSettings]);

  const seoKeywordValue =
    formData?.seo?.keywords?.map((keyword) => ({
      value: keyword,
      label: keyword,
    })) || [];

  // Site data change handler
  const handleSiteChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      site: {
        ...prev.site,
        [name]: value,
      },
    }));
  };

  // Seo data change handler
  const handleChangeSeo = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        [name]: value,
      },
    }));
  };

  // Contact data Change handler
  const handleContactChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [name]: value,
      },
    }));
  };

  // Social Links data Change handler
  const handleSocialLinksChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
  };

  // Features Change handler
  const handleFeatureChange = (e) => {
    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [name]: checked,
      },
    }));
  };

  // Localization change Handler
  const handleLocalizationChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      localization: {
        ...prev.localization,
        [name]: value,
      },
    }));
  };

  // Branding change Handler
  const handleBrandingChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      branding: {
        ...prev.branding,
        [name]: value,
      },
    }));
  };

  // SEO Keyword Change handler
  const handleSeoKeywordsChange = (selectedSeoKeywords) => {
    setFormData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: selectedSeoKeywords.map((option) => option.value),
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await updateSystemSettings(formData);
      if (response.success) {
        notifySuccess(response?.message || "System settings successfully.");
        setSystemSettings(null);
      }
    } catch (error) {
      notifyError(
        error?.response?.message || "Encountered error in updating settings",
        error,
      );
    } finally {
      setLoading(false);
      setSystemSettings(null);
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-center">
          {loading && (
            <div className="w-6 h-6 rounded-full border-4 border-green-500 border-t-white animate-spin" />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Site Information section begins */}
            <SiteInformation
              formData={formData}
              handleSiteChange={handleSiteChange}
            />

            {/* Site Branding section begins */}
            <BrandingSettings
              formData={formData}
              handleBrandingChange={handleBrandingChange}
              setFormData={setFormData}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Seo Information */}
            <SeoSettings
              formData={formData}
              handleChangeSeo={handleChangeSeo}
              setFormData={setFormData}
              customStyles={customStyles}
              dark={false}
              handleSeoKeywordsChange={handleSeoKeywordsChange}
              seoKeywordValue={seoKeywordValue}
            />

            {/* Contact Information */}
            <ContactSettings
              formData={formData}
              handleContactChange={handleContactChange}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Social Links begin */}
            <SocialSettings
              formData={formData}
              handleSocialLinksChange={handleSocialLinksChange}
            />

            {/* Feature Settings begin */}
            <FeatureSettings
              formData={formData}
              handleFeatureChange={handleFeatureChange}
            />

            {/* Localization settings begin */}
            <LocalizationSettings
              formData={formData}
              handleLocalizationChange={handleLocalizationChange}
            />
          </div>

          <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4 flex justify-end">
            <Button
              size="md"
              label={loading ? "Processing..." : "Save Changes"}
              disabled={loading}
            >
              {loading ? (
                <LucideIcon.Loader size={20} className="animate-spin" />
              ) : (
                <LucideIcon.UploadCloudIcon size={20} />
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SystemSettingsManagement;
