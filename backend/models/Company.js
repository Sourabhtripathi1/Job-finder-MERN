const mongoose = require("mongoose");

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

module.exports = mongoose.model("Company", companySchema);
