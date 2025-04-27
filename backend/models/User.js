import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["job_seeker", "employer", "admin"],
      required: true,
    },
    phone: { type: String },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String }, // URL to resume file
      resumeOriginalName: { type: String },
      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
