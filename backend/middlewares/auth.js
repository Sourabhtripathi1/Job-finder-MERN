import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function (req, res, next) {
  const token = req?.cookies?.token;

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify token and decode user info
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user.user; // Assigning the decoded user object to req.user

    // Fetch user from database to ensure user exists
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });
    res.status(401).json({ msg: "Invalid token", error });
  }
}
