const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../middlewares/auth");
const {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");

// File handling setup
const upload = multer({ dest: "temp/" });

// Routes
router.post("/register", auth, upload.single("logo"), registerCompany);
router.get("/get/:id", auth, getCompanyById);
router.get("/list", auth, getCompany);
router.put("/update/:id", auth, upload.single("logo"), updateCompany);
router.delete("/delete/:id", auth, deleteCompany);

module.exports = router;
