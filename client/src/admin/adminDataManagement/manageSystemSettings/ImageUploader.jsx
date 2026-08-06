import { useEffect, useState } from "react";
import { uploadSystemSettingsImage } from "../../../services/systemSettingsApiService";

import {
  notifyError,
  notifySuccess,
} from "../../adminComponent/adminToastNotification/AdminToastNotification";

const ImageUploader = ({ imageType, currentImage, onUploadSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(currentImage || "");

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedMimeTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/svg+xml",
    ];

    if (!allowedMimeTypes.includes(file.type)) {
      notifyError("Only PNG, JPG, JPEG, WEBP and SVG images are allowed.");
      return;
    }

    const maxSize = imageType === "ogImage" ? 5 * 1024 * 1024 : 2 * 1024 * 1024;

    if (file.size > maxSize) {
      notifyError(
        imageType === "ogImage"
          ? "OG Image must not exceed 5 MB."
          : "Image must not exceed 2 MB.",
      );
      return;
    }

    // Local preview
    const imagePreview = URL.createObjectURL(file);

    setPreview(imagePreview);

    try {
      setLoading(true);

      const response = await uploadSystemSettingsImage(imageType, file);

      if (response?.success) {
        notifySuccess(response.message || "Image uploaded successfully.");
        setPreview(null);
        onUploadSuccess?.(response.data);
      }
    } catch (error) {
      notifyError(error.response?.data?.message || "Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {loading && (
        <div className="w-6 h-6 rounded-full border-4 border-green-500 border-t-white animate-spin" />
      )}

      {preview && (
        <img
          src={preview}
          alt={imageType}
          className="w-28 h-28 object-cover rounded-lg border"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input input-sm pl-0 file-input-bordered w-full"
      />
    </div>
  );
};

export default ImageUploader;
