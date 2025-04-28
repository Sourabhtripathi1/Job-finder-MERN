import cloudinary from "./cloudinary.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const uploadFile = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("No file path provided for upload.");
    }

    const randomName = uuidv4();

    const response = await cloudinary.uploader.upload(localFilePath, {
      public_id: randomName,
      folder: "jobFinder",
      resource_type: "raw",
      type: "upload", // important!
    });

    fs.unlinkSync(localFilePath); // remove local temp file

    return {
      fileName: response.public_id,
      url: response.secure_url,
    };
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    console.log(error);

    // throw new Error("Cloudinary file upload failed.");
  }
};

export default uploadFile;
