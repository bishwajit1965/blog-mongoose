const BlogDetailModal = ({ blogView, onClose }) => {
  const { title, content, image } = blogView;

  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  return (
    <div className="modal-box w-11/12 max-w-5xl">
      <div className="">
        <img
          src={`${apiURL}${image}`}
          alt={title}
          className="w-full h-96 shadow-md rounded-md"
        />
      </div>

      <div className="my-2">
        <h3 className="font-bold text-lg">{title}</h3>
        <p>{content}</p>
      </div>

      <div className="modal-action">
        <form method="dialog">
          <button className="btn btn-sm btn-error" onClick={() => onClose()}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogDetailModal;
