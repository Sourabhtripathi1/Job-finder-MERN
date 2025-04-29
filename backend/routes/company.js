import express from "express";
const router = express.Router();
import multer from "multer";
import auth from "../middlewares/auth.js";
import {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
  getUserCompanies,
} from "../controllers/companyController.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// File handling setup
const upload = multer({ storage: storage });

// Routes
router.post("/register", auth, upload.single("logo"), registerCompany);
router.get("/get/:id", auth, getCompanyById);
router.get("/list", auth, getCompany);
router.get("/my-companies", auth, getUserCompanies);
router.put("/update/:id", auth, upload.single("logo"), updateCompany);
router.delete("/delete/:id", auth, deleteCompany);

export default router;
