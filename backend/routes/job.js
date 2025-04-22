import express from "express";
import {
  postJob,
  updateJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
} from "../controllers/jobController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", auth, postJob);
router.put("/update/:id", auth, updateJob);
router.get("/all", getAllJobs);
router.get("/get/:id", getJobById);
router.get("/admin-jobs", auth, getAdminJobs);

export default router;
