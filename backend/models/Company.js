import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gstno: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    address: String,
    website: String,
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    size: {
      type: String,
      enum: ["small", "medium", "large"],
      default: "small",
    },
    logo: {
      type: String,
    },
    CreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Company = mongoose.model("Company", companySchema);
