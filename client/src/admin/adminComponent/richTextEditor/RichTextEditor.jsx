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
    <div className="w-full border dark:border-gray-700 p-2 rounded-md space-y-2">
      <label className="block text-lg font-medium mb-2">Blog Content</label>
      <div className="quill-dark">
        <ReactQuill
          value={content}
          onChange={onContentChange}
          theme="snow"
          placeholder="Write your blog content here..."
          modules={modules} // ✅ Pass the toolbar configuration here!
          className="mb-2"
        />
      </div>
      <div className="border dark:border-gray-700 rounded-md p-2 space-y-2">
        {/* Word Count & Selected Length */}
        <div className="flex justify-between items-center text-sm text-gray-600 font-bold">
          <p>Word Count: {wordCount}</p>
          <p className="font-medium">{selectedLength}</p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="rounded-md dark:text-base-300 dark:bg-gray-800 space-y-1">
          <div className="w-full bg-base-300 dark:bg-gray-900/50 rounded-full h-2.5 relative">
            <div
              className={`h-2.5 rounded-full dark:bg-green-700 ${progressBarColor}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-right flex justify-between text-sm text-gray-500 bg-base-200 dark:bg-gray-800 dark:text-base-300 px-2 py-1 rounded-md font-bold">
            <span className="text-sm font-bold dark:text-gray-400">
              Progress
            </span>{" "}
            <span className="dark:text-gray-400">{progress.toFixed(0)}% </span>
          </p>
        </div>

        {/* Word Length Selector */}
        <div className="">
          <label className="block text-base-content text-sm font-medium dark:text-gray-400">
            Select Word Limit:
          </label>
          <select
            value={selectedLength}
            onChange={onSelectChange}
            className="mt-1 p-2 border rounded w-full text-base-content dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
          >
            <option value="Medium">Medium (300-600 words)</option>
            <option value="Large">Large (600-1200 words)</option>
            <option value="ExtraLarge">Extra Large (1200-2000 words)</option>
            <option value="Jumbo">Jumbo (2000-3000 words)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
