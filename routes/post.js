const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");

// add new post :
router.post("/:id", postController.newPost);

// delete post
router.delete("/:id", postController.deletePost);

// Update Post
router.put("/:id",postController.updatePost);

// get post: 
router.get("/:id", postController.getPost);

//get all post:
router.get("/", postController.getAllPosts);

exports.router = router;