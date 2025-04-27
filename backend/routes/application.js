import auth from "../middlewares/auth.js";
import express from "express";
import {
  applyJob,
  getAppliedJobs,
  getApplicationsByJob,
  updateStatus,
} from "../controllers/applicationController.js";
const router = express.Router();

router.post("/apply/:jobId", auth, applyJob);
router.get("/my-applications", auth, getAppliedJobs);
router.get("/applied-users/:jobId", auth, getApplicationsByJob);
router.post("/update-status/:aId", auth, updateStatus);

export default router;
