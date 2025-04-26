import { Application } from "../models/Application.js";
import { Job } from "../models/Job.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.user._id;
    const jobId = req.params.jobId;

    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required.",
        success: false,
      });
    }

    // check if the user has already applied for the job
    const existingApplication = await Application.findOne({
      jobId,
      userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    // check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // create a new application
    const newApplication = await Application.create({
      jobId,
      userId,
    });

    return res.status(200).json({
      message: "Job applied successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong.",
      success: false,
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ userId })
      .sort({ appliedAt: -1 })
      .populate({
        path: "jobId",
        populate: {
          path: "company location category",
        },
      });

    if (!applications.length) {
      return res.status(404).json({
        message: "No applications found.",
        success: false,
      });
    }

    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong.",
      success: false,
    });
  }
};

// Admin: View all applicants for a job
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const applications = await Application.find({ jobId })
      .sort({ appliedAt: -1 })
      .populate("userId");

    if (!applications.length) {
      return res.status(404).json({
        message: "No applicants found for this job.",
        success: false,
      });
    }

    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong.",
      success: false,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required.",
        success: false,
      });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong.",
      success: false,
    });
  }
};
