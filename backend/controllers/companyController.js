const Company = require("../models/Company");
const Job = require("../models/Job");
const uploadFile = require("../utils/uploadFile");

const registerCompany = async (req, res) => {
  try {
    const { name, gstno, description, website, location, size } = req.body;

    if (!name || !gstno) {
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
      name,
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
    const { name, description, website, location, size, address, gstno } =
      req.body;

    let logo = null;
    if (req.file && req.file.path) {
      const uploadResult = await uploadFile(req.file.path);
      logo = uploadResult.url;
    }

    const updateData = {
      name,
      description,
      website,
      location,
      size,
      address,
      gstno,
    };

    if (logo) updateData.logo = logo;

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
    console.log("Update Company Error:", error.message);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    // Optional: Delete related jobs
    await Job.deleteMany({ companyId: id });

    // Delete company
    await Company.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Company deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Delete Company Error:", error.message);
    return res.status(500).json({
      message: "Failed to delete company.",
      success: false,
    });
  }
};

module.exports = {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
