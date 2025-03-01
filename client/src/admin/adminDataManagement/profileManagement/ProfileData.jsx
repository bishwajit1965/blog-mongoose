import { FaClock, FaEdit, FaTimesCircle } from "react-icons/fa";

import CTAButton from "../../../components/buttons/CTAButton";

const ProfileData = ({ profile, onEdit, onCancel }) => {
  console.log("Profile data", profile);
  return (
    <div className="mt- p-4 border rounded-lg bg-gray- dark:bg-gray-700 dark:border-gray-700 mb-4 shadow-sm">
      <div className="border-b dark:border-b-gray-600 mb-4">
        <h3 className="text-xl font-semibold mb-2">Profile Details</h3>
      </div>
      <div className="space-y-2">
        <div className="">
          <img src={profile.avatar} alt="" className="w-20 h-20 rounded-full" />
        </div>
        <div>
          <strong>Name:</strong> {profile.name}
        </div>
        <div>
          <strong>Email:</strong> {profile.email}
        </div>
        <div>
          <strong>Roles:</strong>
          <span className="bg-gray-300 ml-2 p-1 rounded-md shadow-sm dark:bg-gray-800 text-xs">
            {profile.roles.map((r) => r.name).join(", ")}
          </span>
        </div>
        <div>
          <strong>Permissions:</strong>

          {profile.permissions.map((p) => (
            <span
              className="bg-gray-300 ml-2 p-1 rounded-md shadow-sm dark:bg-gray-800 text-xs"
              key={p._id}
            >
              {p.name}
            </span>
          ))}
        </div>
        <div className="mt-2 flex lg:space-x-6 space-x-1">
          <span className="font-bold text-gray-500 flex items-center">
            <FaClock className="mr-1" />
            <strong className="mr-1">Created At:</strong>
            {profile.createdAt
              ? new Date(profile.createdAt).toLocaleDateString()
              : "Not updated"}
          </span>
          <span className="font-bold text-gray-500 flex items-center">
            <FaClock className="mr-1" />
            <strong className="mr-1">Updated At:</strong>
            {profile.updatedAt
              ? new Date(profile.updatedAt).toLocaleDateString()
              : "Not updated"}
          </span>
        </div>
      </div>

      <div className="flex lg:mt-4 mt-2 space-x-2">
        <CTAButton
          onClick={onEdit}
          label="Edit Profile"
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
    </div>
  );
};

export default ProfileData;
