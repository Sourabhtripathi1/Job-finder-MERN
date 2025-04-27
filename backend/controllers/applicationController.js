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

    console.log(req.user.profile.resume);

    if (!req.user.profile.resume || req.user.profile.resume == "") {
      return res.status(400).json({
        message: "Please upload your resume.",
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
    const userId = req.user._id; // Assuming this comes from your auth middleware

    const applications = await Application.find({ userId })
      .sort({ appliedAt: -1 })
      .populate({
        path: "jobId",
        select: "title company", // Only populate necessary fields
        populate: {
          path: "company",
          select: "name location", // Only populate company name and location
          populate: {
            path: "location",
            select: "name state", // From City collection
          },
        },
      });

    if (!applications.length) {
      return res.status(404).json({
        message: "No applications found.",
        success: false,
      });
    }

    // Format the response cleanly for frontend
    const formattedApplications = applications.map((app) => ({
      _id: app._id,
      status: app.status,
      appliedAt: app.appliedAt,
      job: app.jobId
        ? {
            title: app.jobId.title || "-",
            company: app.jobId.company
              ? {
                  name: app.jobId.company.name || "-",
                  location: app.jobId.company.location
                    ? {
                        name: app.jobId.company.location.name || "-",
                        state: app.jobId.company.location.state || "-",
                      }
                    : null,
                }
              : null,
          }
        : null,
    }));

    return res.status(200).json({
      applications: formattedApplications,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    return res.status(500).json({
      message: "Something went wrong.",
      success: false,
    });
  }
};

export const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { status } = req.query; // Get status filter from query parameters

    // Build the filter object
    let filter = { jobId };

    if (status && status !== "all") {
      filter.status = status;
    }

    const applications = await Application.find(filter)
      .populate("userId", "-password")
      .sort({ appliedAt: -1 });

    res.json({ applications });
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.aId;

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

    application.status = status;
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
