import { addComment } from "../../services/commentApiService";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const ReplyToCommentForm = ({
  parentId = null,
  slug,
  onCancel,
  onDataChanged,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const { mutate: submitComment, isPending } = useMutation({
    mutationFn: (formData) => addComment(slug, formData),
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
        setName("");
        setEmail("");
        setContent("");
        onCancel?.();
        onDataChanged?.();
      }
    },
    onError: (error) => {
      if (error.response?.data?.message) {
        toast.info(error.response.data.message);
      } else {
        toast.error("Something went wrong while replying.");
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name, email, content };
    if (parentId) payload.parentId = parentId;

    submitComment(payload);

    // Reset form
    setName("");
    setEmail("");
    setContent("");
    onCancel?.();
  };
  return (
    <div className="lg:p-4 p-2 bg-gray-200 rounded-md shadow-emerald-100 lg:my-6 my-4">
      <div className="lg:py-">
        <h2 className="text-xl font-extrabold">Add Reply to Comment</h2>
      </div>
      <form onSubmit={handleSubmit} style={{ marginTop: "8px" }}>
        <div className="w-full">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="input input-sm w-full mb-2"
          />
        </div>
        <div className="w-full">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="input input-sm w-full mb-2"
          />
        </div>
        <div className="w-full">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Comment..."
            rows="2"
            required
            className="w-full mb-2 rounded-md p-2"
          />
        </div>
        <div className="w-full lg:space-x-4 space-x-2">
          <button
            type="submit"
            className="btn btn-sm bg-indigo-500 rounded-md shadow-md text-gray-200 border-none"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-sm bg-red-500 rounded-md shadow-md text-gray-200 border-none"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReplyToCommentForm;
