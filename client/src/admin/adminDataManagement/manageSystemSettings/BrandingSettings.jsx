import { Input } from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import ImageUploader from "./ImageUploader";

const BrandingSettings = ({
  formData,
  handleBrandingChange,
  handleFileChange,
  previews,
  setFormData,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 space-y-4 border dark:border-gray-700 dark:bg-gray-800">
      <h1 className="lg:text-2xl text-lg font-bold"> 🎨 Site Branding</h1>

      <div className="grid lg:grid-cols-12 grid-cols-1 items-center justify-between gap-4">
        <div className="lg:col-span-6 col-span-12 space-y-4">
          <div className="grid lg:grid-cols-12 grid-cols-1 items-center justify-between gap-1">
            <div className="lg:col-span-6 col-span-12">
              {/* Previous Logo (Current) */}
              <figure>
                <img
                  src={
                    formData?.branding?.logo?.secureUrl
                      ? formData?.branding?.logo?.secureUrl
                      : "https://i.ibb.co.com/YFjLMfQv/nova-journal-brand.jpg"
                  }
                  alt={formData?.site?.name}
                  className="w-20 rounded-full object-cover"
                />

                <caption className="flex max-w-full items-center justify-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                  {formData?.site?.name} Logo
                </caption>
              </figure>
            </div>

            {/* Preview (New Selection) */}
            <div className="lg:col-span-6 col-span-12">
              {previews?.logo && (
                <figure>
                  <img
                    src={previews.logo}
                    alt=""
                    className="w-20 rounded-full object-cover"
                  />
                  <caption className="flex max-w-xl items-center justify-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                    New Logo
                  </caption>
                </figure>
              )}
            </div>
          </div>

          <div className="">
            <ImageUploader
              imageType="logo"
              currentImage={formData?.branding?.logo?.secureUrl}
              onUploadSuccess={setFormData}
            />
          </div>
        </div>

        <div className="lg:col-span-6 col-span-12 space-y-4">
          <div className="grid lg:grid-cols-12 grid-cols-1 items-center justify-between gap-1">
            <div className="lg:col-span-6 col-span-12">
              <figure>
                <img
                  src={
                    formData?.branding?.favicon?.secureUrl
                      ? formData?.branding?.favicon?.secureUrl
                      : "https://i.ibb.co.com/zHsGWB5q/nova-journal-brand.png"
                  }
                  alt={formData?.site?.name}
                  onChange={(e) =>
                    handleFileChange("favicon", e.target.files?.[0])
                  }
                  className="w-20 rounded-full object-cover"
                />

                <caption className="flex max-w-xl items-center justify-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                  {formData?.site?.name} Favicon
                </caption>
              </figure>
            </div>

            <div className="lg:col-span-6 col-span-12">
              {previews?.favicon && (
                <figure>
                  <img
                    src={previews.favicon}
                    alt=""
                    className="w-20 rounded-full object-cover"
                  />
                  <caption className="flex max-w-xl items-center justify-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                    New Favicon
                  </caption>
                </figure>
              )}
            </div>
          </div>

          <div className="">
            <ImageUploader
              imageType="favicon"
              currentImage={formData?.branding?.favicon?.secureUrl}
              onUploadSuccess={setFormData}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Input
          type="color"
          label="Primary Color"
          name="primaryColor"
          value={formData?.branding?.primaryColor}
          onChange={handleBrandingChange}
          className="px-1"
        />
        <div className="p-">
          <span className="flex items-center gap-4">
            Primary Color: <span>{formData?.branding?.primaryColor}</span>
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 p-2 shadow-md">
              <span
                className="w-4 h-4 rounded-full p-2"
                style={{ backgroundColor: formData?.branding?.primaryColor }}
              />
            </span>
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <Input
          type="color"
          label="Secondary Color"
          name="secondaryColor"
          value={formData?.branding?.secondaryColor}
          onChange={handleBrandingChange}
          className="px-1"
        />
        <div className="p-">
          <span className="flex items-center gap-4">
            Secondary Color: <span>{formData?.branding?.secondaryColor}</span>
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 p-2 shadow-md">
              <span
                className="w-4 h-4 rounded-full p-2"
                style={{ backgroundColor: formData?.branding?.secondaryColor }}
              />
            </span>
          </span>
        </div>
      </div>
      <Textarea
        label="Footer Text"
        name="footerText"
        value={formData?.branding?.footerText}
        onChange={handleBrandingChange}
        rows={2}
      />
    </div>
  );
};

export default BrandingSettings;
1;
