import { useEffect } from "react";

const UserProfileModal = ({ user, closeModal }) => {
  useEffect(() => {
    if (!user) {
      closeModal();
    }
  }, [user, closeModal]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          onClick={closeModal}
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">{user.name}</h2>
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-full mb-4"
        />
        <p>Email: {user.email}</p>
        <p>Roles: {user.roles.map((role) => role.name).join(", ")}</p>
        <p>
          Permissions: {user.permissions.map((perm) => perm.name).join(", ")}
        </p>
      </div>
    </div>
  );
};
export default UserProfileModal;
