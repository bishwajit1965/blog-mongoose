import "react-quill/dist/quill.snow.css";

import ReactQuill from "react-quill";

const modules = {
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

const RichTextEditor = ({
  content,
  onContentChange,
  wordCount,
  progress,
  progressBarColor,
  selectedLength,
  onSelectChange,
}) => {
  return (
    <div className="w-full">
      <label className="block text-lg font-medium mb-2">Blog Content</label>
      <ReactQuill
        value={content}
        onChange={onContentChange}
        theme="snow"
        placeholder="Write your blog content here..."
        modules={modules} // ✅ Pass the toolbar configuration here!
        className="mb-2"
      />

      {/* Word Count & Selected Length */}
      <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
        <p>Word Count: {wordCount}</p>
        <p className="font-medium">{selectedLength}</p>
      </div>

      {/* Progress Bar & Percentage */}
      <div className="mt-2">
        <div className="w-full bg-gray-300 rounded-full h-3 relative">
          <div
            className={`h-3 rounded-full ${progressBarColor}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-right flex justify-between text-sm text-gray-600 mt-1">
          <span className="text-sm">Progress</span>{" "}
          <span>{progress.toFixed(0)}% </span>
        </p>
      </div>

      {/* Word Length Selector */}
      <div className="mt-2">
        <label className="block text-sm font-medium">Select Word Limit:</label>
        <select
          value={selectedLength}
          onChange={onSelectChange}
          className="mt-1 p-2 border rounded w-full"
        >
          <option value="Medium">Medium (300-600 words)</option>
          <option value="Large">Large (600-1200 words)</option>
          <option value="ExtraLarge">Extra Large (1200-2000 words)</option>
          <option value="Jumbo">Jumbo (2000-3000 words)</option>
        </select>
      </div>
    </div>
  );
};

export default RichTextEditor;
