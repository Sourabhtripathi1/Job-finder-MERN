// routes/jobRoutes.js
import express from "express";
import {
  postJob,
  updateJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
} from "../controllers/jobController.js";
import { verifyAdmin } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/create", verifyAdmin, postJob);
router.put("/update/:id", verifyAdmin, updateJob);
router.get("/all", getAllJobs);
router.get("/get/:id", getJobById);
router.get("/admin-jobs", verifyAdmin, getAdminJobs);

export default router;
