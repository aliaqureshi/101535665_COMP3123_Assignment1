const express = require("express");

const {
  createEmployee,
  getAllEmployees,
  getEmployeeById
} = require("../controllers/employeeController");

const protect = require("../middleware/authMiddleware");

const {
  employeeValidator,
  employeeIdParamValidator
} = require("../validators/employeeValidator");

const router = express.Router();

router.get("/employees", protect, getAllEmployees);

router.post(
  "/employees",
  protect,
  employeeValidator,
  createEmployee
);

router.get(
  "/employees/:eid",
  protect,
  employeeIdParamValidator,
  getEmployeeById
);

module.exports = router;