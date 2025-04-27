import express from "express";
import {
  postJob,
  updateJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
  deleteJob,
  getCompanyJobs,
} from "../controllers/jobController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", auth, postJob);
router.put("/update/:id", auth, updateJob);
router.get("/list", getAllJobs);
router.get("/get/:id", getJobById);
router.get("/get/company/:cId", auth, getCompanyJobs);
router.get("/admin-jobs", auth, getAdminJobs);
router.delete("/delete/:id", auth, deleteJob);

export default router;
