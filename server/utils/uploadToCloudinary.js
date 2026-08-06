const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (fileBuffer, folder = "blog-posts") => {
  console.log("Buffer?", Buffer.isBuffer(fileBuffer));
  console.log("Buffer length:", fileBuffer.length);
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },

      (error, result) => {
        console.log("Cloudinary error:", error);
        console.log("Cloudinary result:", result);

        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );

    uploadStream.end(fileBuffer);
  });
};
const deleteFromCloudinary = async (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };
