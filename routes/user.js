const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

//update exsting user:
router.put("/user/:id", userController.updateUser);

//delete existing User:
router.delete('/user/:id', userController.deleteUser);

//get user :
router.get("/user/:id", userController.getUser);

exports.router = router;