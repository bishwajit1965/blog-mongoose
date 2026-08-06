import Select from "react-select";
import { Input } from "../../ui/Input";
import { useMemo } from "react";
import Textarea from "../../ui/Textarea";
import ImageUploader from "./ImageUploader";

const SeoSettings = ({
  formData,
  handleChangeSeo,
  customStyles,
  dark,
  handleSeoKeywordsChange,
  seoKeywordValue,
  setFormData,
}) => {
  console.log("Form data", formData);
  const seoOptions = useMemo(() => {
    return formData?.seo?.keywords?.map((keyword) => ({
      value: keyword,
      label: keyword,
    }));
  }, [formData?.seo?.keywords]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 space-y-4 border dark:border-gray-700 dark:bg-gray-800">
      <h1 className="lg:text-2xl text-lg font-bold">🔍 SEO Settings</h1>

      <div className="space-y-4">
        <Input
          label="Meta Title"
          name="metaTitle"
          value={formData?.seo?.metaTitle}
          onChange={handleChangeSeo}
        />
        <Textarea
          label="Meta Description"
          name="metaDescription"
          value={formData?.seo?.metaDescription}
          onChange={handleChangeSeo}
        />

        <div className="grid lg:grid-cols-12 grid-cols-1 items-center justify-between gap-4">
          <div className="lg:col-span-6 col-span-12 space-y-2">
            <img
              src={
                formData?.seo?.ogImage?.secureUrl
                  ? formData?.seo?.ogImage?.secureUrl
                  : "https://i.ibb.co.com/PGcZ2tcy/nova-journal-og.png"
              }
              alt={formData?.seo?.metaTitle}
              className="w-28 h-28 object-cover rounded-lg"
            />

            <ImageUploader
              imageType="ogImage"
              currentImage={formData?.seo?.ogImage?.secureUrl}
              onUploadSuccess={setFormData}
            />
          </div>
          <div className="lg:col-span-6 col-span-12">
            <Select
              label="Select Keyword"
              isMulti
              options={seoOptions}
              onChange={handleSeoKeywordsChange}
              value={seoKeywordValue}
              styles={customStyles(dark)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoSettings;
