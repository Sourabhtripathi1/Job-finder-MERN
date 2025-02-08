const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["job_seeker", "employer", "admin"],
    required: true,
  },
  phone: { type: String },
  location: { type: String },
  resume: { type: String }, // Resume file URL (Cloudinary/AWS S3)
  company: { type: String }, // Only for employers
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
