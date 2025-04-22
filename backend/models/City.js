import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  state: { type: String, required: true },
});

export const City = mongoose.model("City", CitySchema);
