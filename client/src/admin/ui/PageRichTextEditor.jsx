import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // Header options
    ["bold", "italic", "underline"], // Basic formatting
    [{ list: "ordered" }, { list: "bullet" }], // Ordered & unordered lists
    [{ indent: "-1" }, { indent: "+1" }], // Indentation
    ["blockquote", "code-block"], // Block elements
    ["image", "link", "video"], // Media options
    [{ align: [] }], // Alignment options
    [{ color: [] }, { background: [] }], // Text color and background color
    ["clean"], // Remove formatting
  ],
};
const PageRichTextEditor = ({ value, onChange }) => {
  return (
    <div className="border rounded-md p-2">
      <label className="block font-medium mb-2">Page Content</label>

      <ReactQuill
        value={value || ""}
        onChange={onChange}
        modules={quillModules}
        theme="snow"
        placeholder="Write page content..."
      />
    </div>
  );
};

export default PageRichTextEditor;
