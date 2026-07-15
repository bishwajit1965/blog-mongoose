import {
  AlertCircleIcon,
  CircleCheckBig,
  LucideCheckCircle,
  LucideLoader,
  LucideTrash2,
  XCircle,
} from "lucide-react";
import Button from "./Button";
import Modal from "./Modal";
import { LucideIcon } from "../lib/LucideIcons";

const ConfirmDialogue = ({
  isOpen,
  onClose,
  onConfirm,
  icon = <CircleCheckBig size={20} className="text-blue-500" />,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  onDelete,
  onRestore,
  action = "deletion",
  warning = "This action cannot be undone!",
  variant = "danger",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      warning={warning}
      confirmText={confirmText}
    >
      <div className="space-y-4">
        {/* Message */}
        <div className="flex items-center gap-3">
          <span className="">{icon}</span>

          <p className="text-sm text-gray-700">{message}</p>
        </div>

        {/* Warning */}
        <div className="flex items-center gap-2 ">
          <AlertCircleIcon size={20} className="mt-0.5 text-red-500" />

          <p className="text-sm text-red-500">
            {`Once ${action} is completed the post will be invisible.`}
          </p>
        </div>

        <p className="text-sm flex items-center gap-1.5">
          <LucideIcon.CheckCircle size={20} className="text-blue-500" />{" "}
          {warning}
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="warning" size="xs" onClick={onClose} icon={XCircle}>
            {cancelText}
          </Button>

          <Button
            variant={variant}
            size="xs"
            disabled={loading}
            onClick={onConfirm}
            loading={loading}
          >
            {onDelete ? (
              <LucideLoader size={14} className="animate-spin" />
            ) : onRestore ? (
              <LucideLoader size={14} className="animate-spin" />
            ) : !onDelete ? (
              <LucideCheckCircle size={14} />
            ) : (
              <LucideTrash2 size={14} />
            )}

            {onDelete
              ? "Deleting..."
              : onRestore
                ? "Restoring..."
                : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialogue;
