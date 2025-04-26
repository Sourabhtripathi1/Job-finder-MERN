import dotenv from "dotenv";
dotenv.config(); 
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// Import route modules using ES module syntax
import authRoutes from "./routes/auth.js";
import utilityRoutes from "./routes/utilities.js";
import jobRoutes from "./routes/job.js";
import applicationRoutes from "./routes/application.js";
import companyRoutes from "./routes/company.js";
import userRoutes from "./routes/user.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/utility", utilityRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/user", userRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Job Portal API is Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on: http://localhost:${PORT}`)
);
