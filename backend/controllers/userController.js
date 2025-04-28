import { User } from "../models/User.js";
import uploadFile from "../utils/uploadFile.js";

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
        user.profile.skills = JSON.parse(skills); // skill list update
      }

      if (req.file) {
        const uploadedFile = await uploadFile(req.file.path);

        user.profile.resume = uploadedFile.url;
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

export const updateResume = async (req, res) => {
  try {
    const userid = req.user._id;
    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.role !== "job_seeker") {
      return res
        .status(400)
        .json({ message: "Only job seekers can upload resumes." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No resume file uploaded." });
    }

    // Upload the file
    const uploadedFile = await uploadFile(req.file.path);

    // Update resume fields
    user.profile.resume = uploadedFile.url;
    user.profile.resumeOriginalName = req.file.originalname;

    await user.save();

    res.json({
      message: "Resume updated successfully.",
      resume: uploadedFile.url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update resume." });
  }
};
