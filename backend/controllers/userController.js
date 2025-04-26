import { User } from "../models/User.js";
import uploadFile from "../utils/uploadFile.js"; // Your cloudinary uploader

export const updateUser = async (req, res) => {
  try {
    const { userid } = req.params;
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const { name, phone, location, bio, skills } = req.body;

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.location = location || user.location;

    if (user.role === "job_seeker") {
      user.profile.bio = bio || user.profile.bio;
      if (skills) {
        user.profile.skills = JSON.parse(skills);
      }

      if (req.file) {
        const uploaded = await uploadFile(req.file.path);
        user.profile.resume = uploaded.url;
        user.profile.resumeOriginalName = req.file.originalname;
      }
    }

    await user.save();
    res.json({ message: "Profile updated successfully.", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update profile." });
  }
};
