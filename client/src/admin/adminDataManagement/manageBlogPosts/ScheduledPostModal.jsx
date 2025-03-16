const ScheduledPostModal = ({ blog, onClose }) => {
  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  return (
    <div className={`modal ${blog ? "modal-open" : ""}`}>
      <div className="modal-box w-11/12 max-w-4xl p-0 dark:bg-gray-700">
        <div className="bg-base-300 dark:bg-gray-800 p-2 shadow-sm border-b dark:border-gray-700">
          <h2 className="text-xl font-bold">Post Details</h2>
        </div>
        {blog && (
          <div className="p-2">
            <div className="grid lg:grid-cols-12 grid-cols-1 justify-between gap-2 p-0">
              <div className="lg:col-span-6 col-span-12">
                <img
                  src={`${apiURL}${blog.image}`}
                  alt={blog.title}
                  className="rounded-md w-full shadow-md"
                />
              </div>
              <div className="lg:col-span-6 col-span-12">
                <p>
                  <strong>Title:</strong> {blog.title}
                </p>
                <p>
                  <strong>Content:</strong> {blog.content}
                </p>
                <p>
                  <strong>Status:</strong> {blog.status}
                </p>
                <p className="font-bold">
                  {" "}
                  Will publish At:
                  {new Date(blog.publishAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="modal-action mt-0 p-1 dark:bg-gray-800 bg-base-300">
          <button className="btn btn-sm btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduledPostModal;
