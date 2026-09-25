const express = require("express");
const {
  signup,
  login
} = require("../controllers/userController");

const {
  signupValidator,
  loginValidator
} = require("../validators/userValidator");

const router = express.Router();

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);

module.exports = router;