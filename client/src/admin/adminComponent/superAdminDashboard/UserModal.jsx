const UserModal = ({ user, onClose }) => {
  console.log("USERS", user);
  return (
    <div className={`modal ${user ? "modal-open" : ""}`}>
      <div className="modal-box p-0 dark:bg-gray-700">
        <div className="bg-base-300 dark:bg-gray-800 p-3 shadow-sm border-b dark:border-gray-700">
          <h2 className="text-xl font-bold">User Details</h2>
        </div>
        {user && (
          <div className="mt-2 py-2 px-4 space-y-2">
            <div className="flex justify-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 rounded-full"
              />
            </div>
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
        )}
        <div className="modal-action p-2 bg-base-300 dark:bg-gray-800">
          <button className="btn btn-sm btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
