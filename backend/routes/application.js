import auth from "../middlewares/auth.js";
import express from "express";
const router = express.Router();

router.get("/list", auth, async (req, res) => {
  return;
});

export default router;
