const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");

router.post("/", postController.createPost);

router.get("/", postController.getAllPosts);

router.get("/:id", postController.getPostById);

router.get("/", postController.getPostsBySender);

router.put("/:id", postController.updatePost);

module.exports = router;
