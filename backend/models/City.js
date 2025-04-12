const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  state: { type: String, required: true },
});

module.exports = mongoose.model("City", CitySchema);
