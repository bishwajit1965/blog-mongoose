import { Input } from "../../ui/Input";

const LocalizationSettings = ({ formData, handleLocalizationChange }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 space-y-4 border dark:border-gray-700 dark:bg-gray-800">
      <h1 className="lg:text-2xl text-lg font-bold">
        🌐 Localization Settings
      </h1>

      <div className="space-y-4">
        <Input
          label="Currency"
          name="currency"
          value={formData?.localization?.currency}
          onChange={handleLocalizationChange}
        />
        <Input
          label="Language"
          name="language"
          value={formData?.localization?.language}
          onChange={handleLocalizationChange}
        />
        <Input
          label="Timezone"
          name="timezone"
          value={formData?.localization?.timezone}
          onChange={handleLocalizationChange}
        />
      </div>
    </div>
  );
};

export default LocalizationSettings;
