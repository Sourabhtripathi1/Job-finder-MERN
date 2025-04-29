import express from "express";
import auth from "../middlewares/auth.js";
import multer from "multer";
import { updateUser, updateResume } from "../controllers/userController.js";

const router = express.Router();

// multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// File filter to allow only Word files
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // accept file
  } else {
    cb(new Error("Only Word documents (.doc, .docx) are allowed!"), false); // reject file
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Route for updating user
router.post("/update/resume", auth, upload.single("resume"), updateResume);
router.post("/update/:userid", auth, upload.single("resume"), updateUser);

export default router;
