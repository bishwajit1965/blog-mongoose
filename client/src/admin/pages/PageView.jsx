import CTAButton from "../../components/buttons/CTAButton";
import { LucideIcon } from "../lib/LucideIcons";

const PageView = ({ viewPage, handleCancelView }) => {
  const { title, slug, content } = viewPage || {};
  return (
    <div>
      <h1>{title}</h1>
      <p>{slug}</p>
      <p>{content}</p>
      <div className="flex justify-end">
        <CTAButton
          onClick={handleCancelView}
          icon={<LucideIcon.X size={14} />}
          size="xs"
          variant="danger"
          label="Close"
        />
      </div>
    </div>
  );
};

export default PageView;
