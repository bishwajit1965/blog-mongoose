const ProfileData = ({ profile, onEdit, onCancel }) => {
  console.log("Profile data", profile);
  return (
    <div className="mt- p-4 border rounded-lg bg-gray- dark:bg-gray-700 dark:border-gray-700 mb-4 shadow-sm">
      <div className="border-b dark:border-b-gray-600 mb-4">
        <h3 className="text-xl font-semibold mb-2">Profile Details</h3>
      </div>
      <div className="space-y-2">
        <div className="">
          <img src={profile.avatar} alt="" className="w-12 h-12 rounded-full" />
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
      </div>

      <button
        onClick={onEdit}
        className="mt-4 btn btn-sm bg-blue-500 text-white px-4 py-2 rounded"
      >
        Edit Profile
      </button>

      <button
        onClick={onCancel}
        className="bg-gray-500 btn btn-sm text-white px-4 py-2 rounded"
      >
        Cancel
      </button>
    </div>
  );
};

export default ProfileData;
