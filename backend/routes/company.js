const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../middlewares/auth");
const {
  registerCompany,
  getCompany,
} = require("../controllers/companyController");

// File handling setup
const upload = multer({ dest: "temp/" });

// Routes
router.post("/register", auth, upload.single("logo"), registerCompany);
router.get("/list", auth, getCompany);

module.exports = router;
