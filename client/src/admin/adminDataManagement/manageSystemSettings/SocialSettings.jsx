import { Input } from "../../ui/Input";

const SocialSettings = ({ formData, handleSocialLinksChange }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 space-y-4 border dark:border-gray-700 dark:bg-gray-800">
      <h1 className="lg:text-2xl text-lg font-bold"> 🌐 Social Links</h1>

      <div className="space-y-4">
        <Input
          label="Facebook"
          name="facebook"
          value={formData?.socialLinks?.facebook}
          onChange={handleSocialLinksChange}
        />
        <Input
          label="LinkedIn"
          name="linkedin"
          value={formData?.socialLinks?.linkedin}
          onChange={handleSocialLinksChange}
        />
        <Input
          label="GitHub"
          name="github"
          value={formData?.socialLinks?.github}
          onChange={handleSocialLinksChange}
        />
        <Input
          label="YouTube"
          name="youtube"
          value={formData?.socialLinks?.youtube}
          onChange={handleSocialLinksChange}
        />
        <Input
          label="Twitter"
          name="twitter"
          value={formData?.socialLinks?.twitter}
          onChange={handleSocialLinksChange}
        />
        <Input
          label="Instagram"
          name="instagram"
          value={formData?.socialLinks?.instagram}
          onChange={handleSocialLinksChange}
        />
      </div>
    </div>
  );
};

export default SocialSettings;
