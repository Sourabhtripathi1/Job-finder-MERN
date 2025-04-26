import express from "express";
import auth from "../middlewares/auth.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temp upload to local

router.post("/update/:userid", auth, upload.single("resume"));

export default router;
