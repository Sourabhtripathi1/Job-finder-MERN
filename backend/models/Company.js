const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gstno: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  size: {
    type: String,
    enum: ["small", "medium", "large"],
    default: "small",
  },
  logo: {
    type: String, // URL to company logo
  },
  CreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Company", companySchema);
