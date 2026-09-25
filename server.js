const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

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

// User routes
app.use("/api/v1/user", userRoutes);

// Employee routes
app.use("/api/v1/emp", employeeRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});