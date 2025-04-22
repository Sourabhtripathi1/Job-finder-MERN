import express from "express";
const router = express.Router();
import { City } from "../models/City.js";
import { Category } from "../models/Category.js";

router.get("/city-list", async (req, res) => {
  try {
    const cities = await City.find({});
    return res.status(200).json(cities);
  } catch (err) {
    console.error("Error fetching city list:", err);
    return res.status(500).send({ msg: "Server Error", error: err });
  }
});

router.get("/category-list", async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching category list:", err);
    return res.status(500).send({ msg: "Server Error", error: err });
  }
});

export default router;
