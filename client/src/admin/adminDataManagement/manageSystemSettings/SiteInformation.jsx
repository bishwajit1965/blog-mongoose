import { Input } from "../../ui/Input";
import Textarea from "../../ui/Textarea";

const SiteInformation = ({ formData, handleSiteChange }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 space-y-4 border dark:border-gray-700 dark:bg-gray-800">
      <h1 className="lg:text-2xl text-lg font-bold">🏢 Site Information</h1>

      <Input
        label="Website Name"
        name="name"
        value={formData?.site?.name}
        onChange={handleSiteChange}
      />
      <Input
        label="Website Url"
        name="websiteUrl"
        value={formData?.site?.websiteUrl}
        onChange={handleSiteChange}
      />
      <Textarea
        label="Website Description"
        name="description"
        value={formData?.site?.description}
        onChange={handleSiteChange}
      />
    </div>
  );
};

export default SiteInformation;
