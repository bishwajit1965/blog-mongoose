import { FaCheck, FaRecycle, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

import CTAButton from "../../../components/buttons/CTAButton";

const predefinedComments = [
  "Comment aligns well with the post",
  "Constructive and respectful",
  "Adds value to the discussion",
  "Reviewed and verified",
  "Contains inappropriate language",
  "Spam or promotional content",
  "Violates community guidelines",
  "Irrelevant or off-topic",
  "Duplicate or low-quality comment",
];

const ReviewCommentModal = ({
  isOpen,
  onClose,
  onSubmit,
  actionType,
  reviewHistory = [],
}) => {
  const [reviewComment, setReviewComment] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isCustomMode, setIsCustomMode] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setReviewComment("");
      setReviewComment("");
      setIsCustomMode(false);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    const finalComment = isCustomMode
      ? reviewComment.trim()
      : selectedOption.trim();
    if (!finalComment) return;
    onSubmit(finalComment);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl max-w-md w-full shadow-lg">
        <div className="rounded-t-lg">
          <h2 className="text-lg font-semibold mb-4 bg-gray-200 rounded-t-lg p-4">
            {actionType === "approve"
              ? "✅ Approve Comment"
              : "❌ Reject Comment"}
          </h2>
        </div>
        <div className="p-4">
          {isCustomMode ? (
            <>
              <textarea
                className="w-full border p-2 rounded-md resize-none"
                rows={2}
                placeholder="Add an optional review comment..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
              />
              <button
                className="text-blue-600 text-sm underline mb-3"
                onClick={() => {
                  setIsCustomMode(false);
                  setReviewComment("");
                }}
              >
                ⬅️ Back to predefined options
              </button>
            </>
          ) : (
            <>
              {/* Dropdown */}
              <select
                className="w-full border p-2 rounded-md mb-3"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="">Select a reason (optional)</option>
                {predefinedComments.map((comment, idx) => (
                  <option key={idx} value={comment}>
                    {comment}
                  </option>
                ))}
              </select>
              <div className="">
                <button
                  className="text-blue-600 text-sm underline mb-3"
                  onClick={() => {
                    setIsCustomMode(true);
                    setSelectedOption("");
                  }}
                >
                  🖊️ Write Custom Comment
                </button>
              </div>
            </>
          )}

          <div className="">
            {/* Review History Section */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2 text-gray-600">
                Review History ➡️{" "}
                {reviewHistory.length > 0 ? (
                  reviewHistory.length === 1 ? (
                    <>
                      <span className="text-orange-400">Two review due.</span>
                    </>
                  ) : reviewHistory.length === 2 ? (
                    <>
                      <span className="text-green-400">One review due.</span>
                    </>
                  ) : (
                    <>
                      <span className="text-red-500">
                        Review limit expired.
                      </span>
                    </>
                  )
                ) : (
                  <>
                    <span className="text-indigo-400">
                     Not reviewed yet.
                    </span>
                  </>
                )}{" "}
                ➡️ {reviewHistory.length} review(s).
              </h3>
              {reviewHistory.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-y-auto border p-2 rounded-md bg-gray-50">
                  <div className=""></div>
                  {reviewHistory.map((entry, idx) => (
                    <div
                      key={idx}
                      className="text-sm text-gray-700 border-b last:border-none pb-2"
                    >
                      <p>
                        <strong>Status:</strong> {entry.status}
                      </p>
                      {entry.reviewComment && (
                        <p>
                          <strong>Comment:</strong> {entry.reviewComment}
                        </p>
                      )}
                      <div className="flex items-center space-x-2">
                        <img
                          src={entry.reviewedBy?.avatar}
                          alt=""
                          className="w-8 rounded-full"
                        />
                        <p className="text-xs text-gray-500">
                          <strong>Reviewed By:</strong>{" "}
                          {entry.reviewedBy?.name || entry.reviewedBy}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        <strong>Reviewed At:</strong>{" "}
                        {new Date(entry.reviewedAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No review history available.
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <CTAButton
              onClick={onClose}
              label="Cancel"
              variant="danger"
              icon={<FaTimes />}
              className="btn btn-sm"
            />

            <CTAButton
              onClick={handleSubmit}
              label={actionType === "approve" ? "Approve" : "Reject"}
              icon={actionType === "approve" ? <FaCheck /> : <FaRecycle />}
              className="btn btn-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReviewCommentModal;
