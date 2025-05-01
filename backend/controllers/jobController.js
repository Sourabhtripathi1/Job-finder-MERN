import { Job } from "../models/Job.js";

// Admin creates a new job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      category,
      jobType,
      experience,
      companyId,
      status, // added
    } = req.body;

    const userId = req.user._id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary?.min ||
      !salary?.max ||
      !location ||
      !category ||
      !jobType ||
      experience === undefined ||
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
      requirements: requirements.map((item) => item.trim()),
      salary: {
        min: Number(salary.min),
        max: Number(salary.max),
      },
      location,
      jobType,
      experience,
      category,
      company: companyId,
      status: status !== undefined ? status : 0, // default 0 if not provided
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

// Admin updates an existing job
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const adminId = req.user._id;

    const {
      title,
      description,
      requirements,
      salary,
      location,
      category,
      jobType,
      experience,
      companyId,
      status, // added
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary?.min ||
      !salary?.max ||
      !location ||
      !category ||
      !jobType ||
      experience === undefined ||
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

    if (job.postedBy.toString() != adminId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized action.", success: false });
    }

    job.title = title;
    job.description = description;
    job.requirements = requirements.map((item) => item.trim());
    job.salary = {
      min: Number(salary.min),
      max: Number(salary.max),
    };
    job.location = location;
    job.category = category;
    job.jobType = jobType;
    job.experience = experience;
    job.company = companyId;
    job.status = status !== undefined ? status : job.status; // update if provided

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

// Get job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("company")
      .populate("category")
      .populate("location");

    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    res.status(200).json({ job, success: true });
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Get all jobs of a company
export const getCompanyJobs = async (req, res) => {
  try {
    const companyId = req.params.cId;

    const jobs = await Job.find({ company: companyId })
      .populate("company")
      .populate("category")
      .populate("location");

    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found for this company", success: false });
    }

    res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Get all jobs posted by Admin
// Get all jobs posted by Admin with Pagination
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.user._id;
    const page = parseInt(req.query.page) || 1; // default page 1
    const limit = parseInt(req.query.limit) || 10; // default limit 10

    const skip = (page - 1) * limit;

    const [jobs, totalJobs] = await Promise.all([
      Job.find({ postedBy: adminId })
        .populate({
          path: "company",
          select: "name location",
          populate: {
            path: "location",
            model: "City",
            select: "name state",
          },
        })
        .populate({
          path: "location",
          model: "City",
          select: "name state",
        })
        .populate({
          path: "category",
          model: "Category",
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Job.countDocuments({ postedBy: adminId }),
    ]);

    return res.status(200).json({
      jobs,
      totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: page,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching admin jobs:", error);
    return res.status(500).json({ message: "Server error.", success: false });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    await Job.findByIdAndDelete(jobId);

    return res.json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the job",
    });
  }
};

// Get all jobs with filters
export const getAllJobs = async (req, res) => {
  try {
    const {
      jobTitle,
      city,
      category,
      minSalary,
      maxSalary,
      minExp,
      maxExp,
      jobTypes,
      sortBy,
      page = 1,
      limit = 10,
    } = req.query;

    const query = { $and: [] };

    if (jobTitle) {
      query.$and.push({ title: { $regex: jobTitle, $options: "i" } });
    }

    if (city) {
      query.$and.push({ location: city });
    }

    if (category) {
      query.$and.push({ category });
    }

    if (minSalary || maxSalary) {
      query.$and.push({
        "salary.min": { $gte: Number(minSalary) || 0 },
        "salary.max": { $lte: Number(maxSalary) || Infinity },
      });
    }

    if (minExp || maxExp) {
      query.$and.push({
        experience: {
          $gte: Number(minExp) || 0,
          $lte: Number(maxExp) || 50,
        },
      });
    }

    if (jobTypes) {
      const typesArray = jobTypes.split(",").map((type) => type.trim());
      if (typesArray.length > 0) {
        query.$and.push({ jobType: { $in: typesArray } });
      }
    }

    query.$and.push({ status: 1 });

    if (query.$and.length === 0) {
      delete query.$and;
    }

    let sortOption = {};
    if (sortBy === "date") {
      sortOption = { createdAt: -1 };
    } else {
      sortOption = { title: 1 };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const jobs = await Job.find(query)
      .populate("company")
      .populate("location")
      .populate("category")
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const totalJobs = await Job.countDocuments(query);

    return res.status(200).json({
      jobs,
      totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: Number(page),
      success: true,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ message: "Server error.", success: false });
  }
};