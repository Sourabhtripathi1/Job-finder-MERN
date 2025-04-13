const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: Array, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: {
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
  },
  experience: {
    type: String,
  },
  jobType: {
    type: String,
    enum: ["full-time", "part-time", "internship", "contract"],
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Employer ID
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", JobSchema);
