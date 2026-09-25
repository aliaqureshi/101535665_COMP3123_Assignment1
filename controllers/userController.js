const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("../models/User");

const signup = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array()
      });
    }

    const { username, email, password } = req.body;

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username already exists"
      });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        created_at: user.created_at
      }
    });
  } catch (error) {
    console.error("Signup error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = {
  signup
};