const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "COMP3123 Assignment 1 API",
    student: "Alia Qureshi",
    studentNumber: "101535665"
  });
});

// Health-check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is running"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});