const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Parse Data
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  // Once the connection is open
  mongoose.connection.once("open", () => {
    const dbName = mongoose.connection.db.databaseName;
    console.log("Current Database:", dbName);
  });

  // Handle connection errors
  mongoose.connection.on("error", (err) => {
    console.error("Connection error:", err);
  });

  try {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

// Home Route
app.get("/", (req, res) => {
  res.send(`Hello Express is server Working on ${process.env.PORT}`);
});

// Get Current Database Name Route
app.get("/current-database", async (req, res) => {
  try {
    const dbName = mongoose.connection.db.databaseName;
    res.status(200).json({ databaseName: dbName });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get the database name",
      details: error.message,
    });
  }
});

main();
