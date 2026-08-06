import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import AdminLoader from "../../adminComponent/adminLoader/AdminLoader";
import AdminCardTitle from "../../adminCardTitle/AdminCardTitle";
import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import {
  notifyError,
  notifySuccess,
} from "../../adminComponent/adminToastNotification/AdminToastNotification";
import {
  getSystemSettings,
  updateSystemSettings,
  uploadSystemSettingsImage,
} from "../../../services/systemSettingsApiService";

const emptySettings = {
  site: { name: "", description: "", websiteUrl: "" },
  branding: { primaryColor: "#000000", secondaryColor: "", footerText: "" },
  seo: { metaTitle: "", metaDescription: "", keywords: [] },
  contact: { email: "", phone: "", address: "" },
  socialLinks: {
    facebook: "",
    twitter: "",
    linkedin: "",
    github: "",
    youtube: "",
    instagram: "",
  },
  features: {
    maintenanceMode: false,
    registrationEnabled: true,
    commentsEnabled: true,
    newsletterEnabled: true,
  },
  localization: { timezone: "Asia/Dhaka", language: "en", currency: "USD" },
  security: { maxLoginAttempts: 5, sessionTimeout: 30 },
  backup: { enabled: false, backupFrequency: "weekly" },
  email: { senderName: "", senderEmail: "" },
};

const inputClass =
  "input input-bordered input-sm w-full dark:bg-gray-800 dark:border-gray-700";

const Field = ({ label, children }) => (
  <label className="block space-y-1">
    <span className="text-sm font-medium">{label}</span>
    {children}
  </label>
);

const Section = ({ title, children }) => (
  <section className="lg:col-span-6 col-span-12 rounded-md border border-gray-300 shadow-md dark:border-gray-700 dark:bg-gray-800">
    <AdminCardTitle subTitle="System" decoratedText={title} />
    <div className="grid gap-4 p-4 md:grid-cols-2">{children}</div>
  </section>
);

const Toggle = ({ label, checked, onChange }) => (
  <label className="flex items-center justify-between rounded-md border border-base-300 px-3 py-2 dark:border-gray-700">
    <span className="text-sm font-medium">{label}</span>
    <input
      type="checkbox"
      className="toggle toggle-primary toggle-sm"
      checked={checked}
      onChange={onChange}
    />
  </label>
);

const ManageSystemSettings = () => {
  const [settings, setSettings] = useState(emptySettings);
  const [files, setFiles] = useState({
    logo: null,
    favicon: null,
    "og-image": null,
  });
  const [previews, setPreviews] = useState({
    logo: "",
    favicon: "",
    "og-image": "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await getSystemSettings();
        setSettings((current) => ({ ...current, ...response?.settings }));
        setPreviews({
          logo: response.settings.branding?.logo?.url || "",
          favicon: response.settings.branding?.favicon?.url || "",
          "og-image": response.settings.seo?.ogImage?.url || "",
        });
      } catch (error) {
        notifyError(
          error.response?.data?.message || "Could not load system settings.",
        );
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {}, [previews]);

  const updateField = (section, field, value) => {
    setSettings((current) => ({
      ...current,
      [section]: { ...current[section], [field]: value },
    }));
  };

  const handleFileChange = (imageType, file) => {
    setFiles((current) => ({ ...current, [imageType]: file || null }));
    setPreviews((current) => ({
      ...current,
      [imageType]: file ? URL.createObjectURL(file) : current[imageType],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      let response = await updateSystemSettings(settings);
      for (const [imageType, file] of Object.entries(files)) {
        if (file) response = await uploadSystemSettingsImage(imageType, file);
      }

      setSettings((current) => ({ ...current, ...response.settings }));

      setPreviews({
        logo: response.settings.branding?.logo?.url || "",
        favicon: response.settings.branding?.favicon?.url || "",
        "og-image": response.settings.seo?.ogImage?.url || "",
      });
      setFiles({ logo: null, favicon: null, "og-image": null });
      notifySuccess("System settings saved.");
    } catch (error) {
      notifyError(
        error.response?.data?.message || "Could not save system settings.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLoader />;

  return (
    <div>
      <Helmet>
        <title>Blog || System Settings</title>
      </Helmet>
      <AdminSubTitle subTitle="System" decoratedText="Settings" />

      <form
        className="grid grid-cols-1 justify-between gap-2 p-2 lg:grid-cols-12 lg:gap-4"
        onSubmit={handleSubmit}
      >
        <Section title="General">
          <Field label="Site name">
            <input
              className={inputClass}
              value={settings.site.name || ""}
              onChange={(e) => updateField("site", "name", e.target.value)}
            />
          </Field>
          <Field label="Website URL">
            <input
              type="url"
              className={inputClass}
              value={settings.site.websiteUrl || ""}
              onChange={(e) =>
                updateField("site", "websiteUrl", e.target.value)
              }
            />
          </Field>
          <Field label="Site description">
            <textarea
              className="textarea textarea-bordered w-full dark:bg-gray-800 dark:border-gray-700"
              value={settings.site.description || ""}
              onChange={(e) =>
                updateField("site", "description", e.target.value)
              }
            />
          </Field>
        </Section>

        <Section title="Branding">
          <Field label="Primary color">
            <input
              type="color"
              className="h-10 w-full rounded border border-base-300"
              value={settings.branding.primaryColor || "#000000"}
              onChange={(e) =>
                updateField("branding", "primaryColor", e.target.value)
              }
            />
          </Field>
          <Field label="Secondary color">
            <input
              type="color"
              className="h-10 w-full rounded border border-base-300"
              value={settings.branding.secondaryColor || "#ffffff"}
              onChange={(e) =>
                updateField("branding", "secondaryColor", e.target.value)
              }
            />
          </Field>
          <Field label="Footer text">
            <input
              className={inputClass}
              value={settings.branding.footerText || ""}
              onChange={(e) =>
                updateField("branding", "footerText", e.target.value)
              }
            />
          </Field>

          {[
            ["logo", "Logo"],
            ["favicon", "Favicon"],
          ].map(([type, label]) => (
            <Field key={type} label={label}>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered file-input-sm w-full"
                onChange={(e) => handleFileChange(type, e.target.files?.[0])}
              />
              {previews[type] && (
                <img
                  src={previews[type]}
                  alt={`${label} preview`}
                  className="mt-2 h-14 max-w-36 rounded object-contain"
                />
              )}
            </Field>
          ))}
        </Section>

        <Section title="SEO">
          <Field label="Meta title">
            <input
              className={inputClass}
              value={settings.seo.metaTitle || ""}
              onChange={(e) => updateField("seo", "metaTitle", e.target.value)}
            />
          </Field>
          <Field label="Keywords (comma-separated)">
            <input
              className={inputClass}
              value={(settings.seo.keywords || []).join(", ")}
              onChange={(e) =>
                updateField(
                  "seo",
                  "keywords",
                  e.target.value
                    .split(",")
                    .map((keyword) => keyword.trim())
                    .filter(Boolean),
                )
              }
            />
          </Field>
          <Field label="Meta description">
            <textarea
              className="textarea textarea-bordered w-full dark:bg-gray-800 dark:border-gray-700"
              value={settings.seo.metaDescription || ""}
              onChange={(e) =>
                updateField("seo", "metaDescription", e.target.value)
              }
            />
          </Field>
          <Field label="Open Graph image">
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered file-input-sm w-full"
              onChange={(e) =>
                handleFileChange("og-image", e.target.files?.[0])
              }
            />
            {previews["og-image"] && (
              <img
                src={previews["og-image"]}
                alt="Open Graph preview"
                className="mt-2 h-14 max-w-36 rounded object-contain"
              />
            )}
          </Field>
        </Section>

        <Section title="Contact and Social Links">
          <Field label="Email">
            <input
              type="email"
              className={inputClass}
              value={settings.contact.email || ""}
              onChange={(e) => updateField("contact", "email", e.target.value)}
            />
          </Field>
          <Field label="Phone">
            <input
              className={inputClass}
              value={settings.contact.phone || ""}
              onChange={(e) => updateField("contact", "phone", e.target.value)}
            />
          </Field>
          <Field label="Address">
            <input
              className={inputClass}
              value={settings.contact.address || ""}
              onChange={(e) =>
                updateField("contact", "address", e.target.value)
              }
            />
          </Field>
          {Object.keys(settings.socialLinks).map((platform) => (
            <Field key={platform} label={platform}>
              <input
                type="url"
                className={inputClass}
                value={settings.socialLinks[platform] || ""}
                onChange={(e) =>
                  updateField("socialLinks", platform, e.target.value)
                }
              />
            </Field>
          ))}
        </Section>

        <Section title="Feature Controls">
          {Object.entries(settings.features).map(([feature, enabled]) => (
            <Toggle
              key={feature}
              label={feature.replace(/([A-Z])/g, " $1")}
              checked={Boolean(enabled)}
              onChange={(e) =>
                updateField("features", feature, e.target.checked)
              }
            />
          ))}
        </Section>

        <Section title="Localization and Security">
          <Field label="Timezone">
            <input
              className={inputClass}
              value={settings.localization.timezone || ""}
              onChange={(e) =>
                updateField("localization", "timezone", e.target.value)
              }
            />
          </Field>
          <Field label="Language">
            <input
              className={inputClass}
              value={settings.localization.language || ""}
              onChange={(e) =>
                updateField("localization", "language", e.target.value)
              }
            />
          </Field>
          <Field label="Currency">
            <input
              className={inputClass}
              value={settings.localization.currency || ""}
              onChange={(e) =>
                updateField("localization", "currency", e.target.value)
              }
            />
          </Field>
          <Field label="Maximum login attempts">
            <input
              type="number"
              min="1"
              className={inputClass}
              value={settings.security.maxLoginAttempts ?? 5}
              onChange={(e) =>
                updateField(
                  "security",
                  "maxLoginAttempts",
                  Number(e.target.value),
                )
              }
            />
          </Field>
          <Field label="Session timeout (minutes)">
            <input
              type="number"
              min="1"
              className={inputClass}
              value={settings.security.sessionTimeout ?? 30}
              onChange={(e) =>
                updateField(
                  "security",
                  "sessionTimeout",
                  Number(e.target.value),
                )
              }
            />
          </Field>
        </Section>

        <Section title="Email and Backup">
          <Field label="Sender name">
            <input
              className={inputClass}
              value={settings.email.senderName || ""}
              onChange={(e) =>
                updateField("email", "senderName", e.target.value)
              }
            />
          </Field>
          <Field label="Sender email">
            <input
              type="email"
              className={inputClass}
              value={settings.email.senderEmail || ""}
              onChange={(e) =>
                updateField("email", "senderEmail", e.target.value)
              }
            />
          </Field>
          <Field label="Backup frequency">
            <select
              className="select select-bordered select-sm w-full dark:bg-gray-800"
              value={settings.backup.backupFrequency || "weekly"}
              onChange={(e) =>
                updateField("backup", "backupFrequency", e.target.value)
              }
            >
              {["daily", "weekly", "monthly"].map((frequency) => (
                <option key={frequency} value={frequency}>
                  {frequency}
                </option>
              ))}
            </select>
          </Field>
          <Toggle
            label="Enable backups"
            checked={Boolean(settings.backup.enabled)}
            onChange={(e) => updateField("backup", "enabled", e.target.checked)}
          />
        </Section>

        <div className="sticky bottom-3 flex justify-end lg:col-span-12">
          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageSystemSettings;
