const express = require("express");
const authController = require("../controller/authController")
const router = express.Router();


//register new User:
router.post("/register",authController.registerUser);

//login existing User:
router.post("/login", authController.loginUser);


exports.router = router;