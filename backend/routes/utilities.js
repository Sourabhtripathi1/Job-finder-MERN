import express from "express";
const router = express.Router();
import { City } from "../models/City.js";
import { Category } from "../models/Category.js";
import { Company } from "../models/Company.js";
import { Job } from "../models/Job.js";
import { Application } from "../models/Application.js";
import { User } from "../models/User.js";
import auth from "../middlewares/auth.js";

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

router.get("/dashboard-stats", auth, async (req, res) => {
  try {
    const companiesCount = await Company.countDocuments({
      CreatedBy: mongoose.Types.ObjectId(req.user._id),
    });

    const jobsCount = await Job.countDocuments({
      postedBy: mongoose.Types.ObjectId(req.user._id),
    });

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const newApplicants = await Application.aggregate([
      {
        $match: {
          appliedAt: { $gte: last7Days },
        },
      },
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "job",
        },
      },
      {
        $unwind: "$job",
      },
      {
        $match: {
          "job.postedBy": mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $count: "newApplicants",
      },
    ]);

    const newApplicantsCount =
      newApplicants.length > 0 ? newApplicants[0].newApplicants : 0;

    const totalUsers = await User.find({ role: "job_seeker" }).countDocuments();

    const activeJobs = await Job.countDocuments({
      status: 1,
      postedBy: req.user._id,
    });

    const dashboardData = {
      companiesCount,
      jobsCount,
      newApplicants: newApplicantsCount,
      totalUsers,
      activeJobs,
    };

    return res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data: ", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

export default router;
