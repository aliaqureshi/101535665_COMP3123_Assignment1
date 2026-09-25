const express = require("express");
const { signup } = require("../controllers/userController");
const { signupValidator } = require("../validators/userValidator");

const router = express.Router();

router.post("/signup", signupValidator, signup);

module.exports = router;