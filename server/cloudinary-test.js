require("dotenv").config();

const cloudinary = require("./config/cloudinary");

(async () => {
  try {
    console.log("Cloud:", process.env.CLOUDINARY_CLOUD_NAME);

    const result = await cloudinary.uploader.upload("./nova-journal-brand.svg");
    console.log("UPLOAD RESULT:");
    console.log(result);

    const resource = await cloudinary.api.resource(result.public_id);

    console.log("RESOURCE:");
    console.log(resource);
  } catch (err) {
    console.error(err);
  }
})();
