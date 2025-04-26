import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: [String], required: true },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    salary: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    experience: { type: Number, required: true },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 0,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", JobSchema);
