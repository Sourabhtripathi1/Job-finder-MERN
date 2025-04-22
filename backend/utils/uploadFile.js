import cloudinary from "./cloudinary.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

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
export default uploadFile;
