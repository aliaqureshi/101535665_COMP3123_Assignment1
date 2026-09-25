const { validationResult } = require("express-validator");
const Employee = require("../models/Employee");

const createEmployee = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array()
      });
    }

    const {
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department
    } = req.body;

    const employee = await Employee.create({
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department,
      user: req.user.id
    });

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee
    });
  } catch (error) {
    console.error("Create employee error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = {
  createEmployee
}; 