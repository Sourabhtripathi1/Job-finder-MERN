require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/utility", require("./routes/utilities"));
app.use("/api/job", require("./routes/job"));
app.use("/api/application", require("./routes/application"));
app.use("/api/company", require("./routes/company"));

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
