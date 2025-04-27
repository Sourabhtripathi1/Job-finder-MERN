import express from "express";
import auth from "../middlewares/auth.js";
import multer from "multer";
import { updateUser } from "../controllers/userController.js";

const router = express.Router();
// const upload = multer({ dest: "temp/" }); // temp upload to local

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/update/:userid", auth, upload.single("resume"), updateUser);

export default router;
