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
            className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700"
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
            className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700"
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
            className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        {isEditing && (
          <>
            <button
              type="submit"
              className="bg-blue-500 btn btn-sm text-white px-4 py-2 rounded mt-2"
            >
              Update
            </button>

            <button
              onClick={onCancel}
              className="bg-gray-500 btn btn-sm text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
