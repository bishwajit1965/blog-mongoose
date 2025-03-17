import useSocketConnection from "../../../../../server/helpers/useSocketConnection";

const UserModal = ({ user, onClose }) => {
  const { isUserOnline } = useSocketConnection(user?._id);

  return (
    <div className={`modal ${user ? "modal-open" : ""}`}>
      <div className="modal-box p-0 dark:bg-gray-800">
        <div className="bg-base-300 dark:bg-gray-900 p-3 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold">User Profile Details</h2>
        </div>
        {user && (
          <div className="space-y-2 mb-2">
            <div className="shadow-sm rounded-md py-2">
              <div className="flex justify-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 rounded-full"
                />
              </div>
              <div className="flex justify-center">
                <span className="font-bold mr-2">User is:</span>
                {isUserOnline ? (
                  <span className="text-green-500 font-bold">🟢 Online</span>
                ) : (
                  <span className="text-gray-500">🔴 Offline</span>
                )}
              </div>
            </div>
            <div className="px-2">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Status:</strong> {user.isActive ? "Active" : "Inactive"}
              </p>
              <p>
                <strong>Roles:</strong>{" "}
                {user.roles?.map((role, index) => (
                  <span key={index}>{role.name}</span>
                ))}
              </p>
              <p>
                <strong>Permissions:</strong>{" "}
                {user.permissions?.map((permission, index) => (
                  <span key={index}>
                    {permission.name}
                    {index !== user.permissions.length - 1 && ", "}
                  </span>
                ))}
              </p>
            </div>
          </div>
        )}
        <div className="modal-action p-2 mt-0 bg-base-300 dark:bg-gray-900">
          <button className="btn btn-sm btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
