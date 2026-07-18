import {
  AlertCircleIcon,
  CircleCheckBig,
  LucideCheckCircle,
  XCircle,
} from "lucide-react";

import Button from "./Button";
import Modal from "./Modal";
import { LucideIcon } from "../lib/LucideIcons";

const ConfirmDialogue = ({
  isOpen,
  onClose,
  onConfirm,

  // Header
  icon = <CircleCheckBig size={20} className="text-blue-500" />,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",

  // Warning
  actionName = "this action",
  warning = "This action cannot be undone!",

  // Confirm button
  confirmIcon = LucideCheckCircle,
  confirmText = "Confirm",
  confirmLoadingText = "Processing...",
  variant = "primary",

  // Cancel button
  cancelText = "Cancel",

  // Loading
  loading = false,
}) => {
  const ConfirmIcon = confirmIcon;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        {/* Message */}
        <div className="flex items-center gap-3">
          {icon}
          <p className="text-sm text-gray-700">{message}</p>
        </div>

        {/* Action warning */}
        <div className="flex items-center gap-2">
          <AlertCircleIcon size={20} className="text-red-500" />

          <p className="text-sm text-red-500">
            Once {actionName} is completed, the post will be invisible.
          </p>
        </div>

        {/* Additional warning */}
        <div className="flex items-center gap-2">
          <LucideIcon.CheckCircle size={20} className="text-blue-500" />

          <p className="text-sm">{warning}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="warning" size="xs" onClick={onClose} icon={XCircle}>
            {cancelText}
          </Button>

          <Button
            variant={variant}
            size="xs"
            loading={loading}
            onClick={onConfirm}
            icon={ConfirmIcon}
          >
            {loading ? confirmLoadingText : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialogue;
