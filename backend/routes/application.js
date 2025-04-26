import auth from "../middlewares/auth.js";
import express from "express";
import { applyJob } from "../controllers/applicationController.js";
const router = express.Router();

router.post("/apply/:jobId", auth, applyJob);

export default router;
