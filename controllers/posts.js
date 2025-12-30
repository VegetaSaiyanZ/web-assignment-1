const express = require("express");
const router = express.Router();

const getAllPosts = (req, res) => {
  res.send("get all posts");
};

const createPost = (req, res) => {
  res.send("create a post");
};

module.exports = {
  getAllPosts,
  createPost,
};
