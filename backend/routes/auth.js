import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import { User } from "../models/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// 📌 Register User (Signup)
router.post(
  "/register",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password, role } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ name, email, password: hashedPassword, role });
      await user.save();

      const payload = { user: { user } };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

      res
        .status(200)
        .cookie("token", token, {
          // httpOnly: true,
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({ msg: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ msg: "Server Error", error });
    }
  }
);

// 📌 Login User (Signin)
router.post(
  "/login",
  [
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password is required").exists(),
    check(
      "role",
      "Role is required and must be either 'job_seeker' or 'employer'"
    )
      .notEmpty()
      .isIn(["job_seeker", "employer"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password, role } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(400).json({ msg: "Invalid credentials" });

      if (user.role !== role)
        return res.status(403).json({ msg: "Role mismatch" });

      const payload = { user: { user } };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      res
        .status(200)
        .cookie("token", token, {
          // httpOnly: true,
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({ msg: "Login successful" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Server Error", error });
    }
  }
);

// 📌 Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
  });
  res.status(200).json({ msg: "Logged out" });
});

// 📌 Get User Profile (Protected Route)
router.get("/me", async (req, res) => {
  try {
    const token = req?.cookies?.token;

    if (!token)
      return res.status(401).json({ msg: "No token, authorization denied" });

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.user.user._id).select("-password");

    const payload = { user: { user } };
    const newToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res
      .status(200)
      .cookie("token", newToken, {
        // httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ msg: "Login successful", user });

  } catch (error) {
    console.log(error);

    res.status(500).send({ msg: "Server Error", error });
  }
});

export default router;
