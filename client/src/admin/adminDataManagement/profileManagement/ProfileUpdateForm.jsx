import { FaEdit, FaTimesCircle } from "react-icons/fa";

import CTAButton from "../../../components/buttons/CTAButton";
import { useState } from "react";

const ProfileUpdateForm = ({ profile, isEditing, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    avatar: profile.avatar || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="p-4 border rounded-lg mb-4 shadow-md dark:bg-gray-700 dark:border-gray-700">
      <h3 className="text-xl font-semibold mb-2">
        {isEditing ? "Edit Profile" : "Profile Details"}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 input-sm rounded dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 input-sm rounded dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block">Avatar:</label>
          <input
            type="text"
            name="avatar"
            value={formData?.avatar}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 input-sm rounded dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        {isEditing && (
          <div className="flex space-x-2 pt-2">
            <CTAButton
              label="Update Data"
              icon={<FaEdit />}
              className="btn btn-sm text-sm"
              variant="primary"
            />

            <CTAButton
              onClick={onCancel}
              label="Cancel"
              icon={<FaTimesCircle />}
              className="btn btn-sm text-sm"
              variant="warning"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
