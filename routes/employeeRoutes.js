const express = require("express");
const {
  createEmployee,
  getAllEmployees
} = require("../controllers/employeeController");

const protect = require("../middleware/authMiddleware");
const { employeeValidator } = require("../validators/employeeValidator");

const router = express.Router();

router.get("/employees", protect, getAllEmployees);

router.post("/employees", protect, employeeValidator, createEmployee);

module.exports = router;