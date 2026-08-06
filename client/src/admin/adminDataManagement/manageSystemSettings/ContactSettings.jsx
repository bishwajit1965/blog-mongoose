import { Input } from "../../ui/Input";

const ContactSettings = ({ formData, handleContactChange }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 space-y-4 border dark:border-gray-700 dark:bg-gray-800">
      <h1 className="lg:text-2xl text-lg font-bold">📞 Contact Information</h1>
      <div className="space-y-4">
        <Input
          label="Email"
          name="email"
          value={formData?.contact?.email}
          onChange={handleContactChange}
        />
        <Input
          label="Phone"
          name="phone"
          value={formData?.contact?.phone}
          onChange={handleContactChange}
        />
        <Input
          label="Address"
          name="address"
          value={formData?.contact?.address}
          onChange={handleContactChange}
        />
      </div>
    </div>
  );
};

export default ContactSettings;
