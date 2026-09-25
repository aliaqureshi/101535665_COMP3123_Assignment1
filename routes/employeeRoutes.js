const express = require("express");
const { createEmployee } = require("../controllers/employeeController");
const protect = require("../middleware/authMiddleware");
const { employeeValidator } = require("../validators/employeeValidator");

const router = express.Router();

router.post("/employees", protect, employeeValidator, createEmployee);

module.exports = router;