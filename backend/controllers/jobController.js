import { Job } from "../models/Job.js";

// Admin creates a new job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salaryMin,
      salaryMax,
      location,
      jobType,
      experience,
      companyId,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salaryMin ||
      !salaryMax ||
      !location ||
      !jobType ||
      !experience ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(",").map((item) => item.trim()),
      salary: {
        min: Number(salaryMin),
        max: Number(salaryMax),
      },
      location,
      jobType,
      experience,
      company: companyId,
      postedBy: userId,
    });

    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.error("Error posting job:", error);
    return res.status(500).json({ message: "Server error.", success: false });
  }
};

// ✅ Admin updates an existing job
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const adminId = req.id;

    const {
      title,
      description,
      requirements,
      salaryMin,
      salaryMax,
      location,
      jobType,
      experience,
      companyId,
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !salaryMin ||
      !salaryMax ||
      !location ||
      !jobType ||
      !experience ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found.", success: false });
    }

    if (job.postedBy.toString() !== adminId) {
      return res
        .status(403)
        .json({ message: "Unauthorized action.", success: false });
    }

    job.title = title;
    job.description = description;
    job.requirements = requirements.split(",").map((item) => item.trim());
    job.salary = {
      min: Number(salaryMin),
      max: Number(salaryMax),
    };
    job.location = location;
    job.jobType = jobType;
    job.experience = experience;
    job.company = companyId;

    await job.save();

    return res.status(200).json({
      message: "Job updated successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).json({ message: "Server error.", success: false });
  }
};

// Get all jobs (student)
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ message: "Server error.", success: false });
  }
};

// Get job by ID
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate("company");

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return res.status(500).json({ message: "Server error.", success: false });
  }
};

// Admin's jobs
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ postedBy: adminId })
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching admin jobs:", error);
    return res.status(500).json({ message: "Server error.", success: false });
  }
};
