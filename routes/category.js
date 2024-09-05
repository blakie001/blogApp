const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");


router.post("/", categoryController.postCategory);

//get all category:
router.get("/cat", categoryController.getCategory);



exports.router = router;