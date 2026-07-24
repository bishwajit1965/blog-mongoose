import { Input } from "../../ui/Input";
import { LucideIcon } from "../../lib/LucideIcons";
// import Textarea from "../../ui/Textarea";
import CTAButton from "../../../components/buttons/CTAButton";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

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

const PageForm = ({
  onCancel,
  pageForm,
  onHandleChange,
  onPageSubmit,
  onSelectEditPage,
  errors,
  setPageForm,
}) => {
  return (
    <div>
      <form
        onSubmit={onPageSubmit}
        className="space-y-4 border border-base-content/15 lg:p-8 p-4 shadow-sm hover:shadow-xl rounded-xl"
      >
        <Input
          label="Page Title"
          placeholder="Page title..."
          icon={LucideIcon.LucideTextAlignStart}
          name="title"
          value={pageForm?.title}
          onChange={onHandleChange}
          error={errors?.title}
        />

        <Input
          label="Page Slug"
          placeholder="Page slug..."
          icon={LucideIcon.LucideTextAlignStart}
          name="slug"
          value={pageForm?.slug}
          onChange={onHandleChange}
          error={errors?.slug}
        />

        <ReactQuill
          theme="snow"
          modules={quillModules}
          value={pageForm.content || ""}
          onChange={(value) => {
            setPageForm((prev) => ({
              ...prev,
              content: value,
            }));
          }}
        />

        {/* <Textarea
          label="Page Content"
          placeholder="Page content..."
          icon={LucideIcon.LucideTextAlignStart}
          name="content"
          value={pageForm?.content}
          onChange={onHandleChange}
          error={errors?.content}
        /> */}

        <Input
          label="Seo Title"
          placeholder="Seo title..."
          icon={LucideIcon.LucideTextAlignStart}
          name="seoTitle"
          value={pageForm?.seoTitle}
          onChange={onHandleChange}
          error={errors?.seoTitle}
        />

        <Input
          label="Seo Description"
          placeholder="Seo description..."
          icon={LucideIcon.LucideTextAlignStart}
          name="seoDescription"
          value={pageForm?.seoDescription}
          onChange={onHandleChange}
          error={errors?.seoDescription}
        />

        <select
          name="status"
          className="select w-full select-bordered"
          onChange={onHandleChange}
          value={pageForm?.status}
        >
          <option disabled={true}>Select Status</option>
          <option default="draft" value="draft">
            Draft
          </option>
          <option value="published">Published</option>
        </select>

        <select
          name="pageType"
          className="select w-full select-bordered"
          onChange={onHandleChange}
          value={pageForm?.pageType}
        >
          <option disabled={true}>Select Page type</option>
          {[
            "about",
            "contact",
            "privacy-policy",
            "terms-and-conditions",
            "cookie-policy",
            "disclaimer",
            "dmca",
            "editorial-policy",
            "licensing",
            "custom",
          ]?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="flex flex-wrap items-center gap-2">
          <CTAButton
            type="submit"
            icon={
              onSelectEditPage ? (
                <LucideIcon.Edit size={14} />
              ) : (
                <LucideIcon.UploadCloudIcon size={14} />
              )
            }
            size="sm"
            variant="primary"
            label={onSelectEditPage ? "Update Page" : "Upload Page"}
          />

          {onSelectEditPage && (
            <CTAButton
              onClick={onCancel}
              size="sm"
              variant="warning"
              label="cancel"
              icon={<LucideIcon.RefreshCcwDot size={14} />}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default PageForm;
