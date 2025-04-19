const Company = require("../models/Company");
const Job = require("../models/Job");
const uploadFile = require("../utils/uploadFile");

const registerCompany = async (req, res) => {
  try {
    const { companyName, gstno, description, website, location, size } =
      req.body;

    if (!companyName || !gstno) {
      return res.status(400).json({
        message: "Company name and GST number are required.",
        success: false,
      });
    }

    // Check for existing company
    const existingCompany = await Company.findOne({ gstno });
    if (existingCompany) {
      return res.status(400).json({
        message: "Company with provided GST number already exists.",
        success: false,
      });
    }

    // Optional logo upload
    let logoUrl = null;
    if (req.file && req.file.path) {
      const uploadResult = await uploadFile(req.file.path);
      logoUrl = uploadResult.url;
    }

    const newCompany = await Company.create({
      name: companyName,
      gstno,
      description,
      website,
      location,
      size,
      logo: logoUrl,
      CreatedBy: req.user._id, // Make sure this is set by auth middleware
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company: newCompany,
      success: true,
    });
  } catch (error) {
    console.error("Register Company Error:", error.message);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

const getCompany = async (req, res) => {
  try {
    const companies = await Company.find().populate("CreatedBy", "name email");

    // For each company, count active jobs
    const companiesWithJobCount = await Promise.all(
      companies.map(async (company) => {
        const activeJobCount = await Job.countDocuments({
          companyId: company._id,
          status: 1,
        });

        return {
          ...company.toObject(),
          activeJobs: activeJobCount,
        };
      })
    );

    return res.status(200).json({
      companies: companiesWithJobCount,
      success: true,
    });
  } catch (error) {
    console.error("Get Company Error:", error.message);
    return res.status(500).json({
      message: "Unable to fetch companies.",
      success: false,
    });
  }
};

// get company by id
const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const file = req.file;
    // idhar cloudinary ayega
    const fileUri = getDataUri(file);
    var logo = null;
    if (fileUri) {
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }

    const updateData = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company information updated.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
};
