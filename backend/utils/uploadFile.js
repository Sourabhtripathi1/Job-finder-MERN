const cloudinary = require("./cloudinary");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const uploadFile = async (localFilePath) => {
  try {
    const randomName = uuidv4();

    const response = await cloudinary.uploader.upload(localFilePath, {
      public_id: randomName,
      folder: "jobFinder",
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath); // Delete temp file

    return {
      fileName: response.public_id,
      url: response.secure_url,
    };
  } catch (error) {
    fs.unlinkSync(localFilePath);
    throw new Error("File upload failed.");
  }
};
module.exports = uploadFile;
