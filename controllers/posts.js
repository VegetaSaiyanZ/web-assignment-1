const PostModel = require("../models/posts_model");
const { StatusCodes } = require("http-status-codes");

const createPost = async (req, res) => {
  try {
    const postBody = req.body;
    const post = await PostModel.create(postBody);
    res.status(StatusCodes.CREATED).send(post);
  } catch (error) {
    if (error.name === "ValidationError") {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "Validation error", details: error.message });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Server error", details: error.message });
    }
  }
};

const getAllPosts = async (req, res) => {
  try {
    const filter = req.query.sender;
    if (filter) {
      const posts = await PostModel.find({ sender: filter });
      res.send(posts);
    } else {
      const posts = await PostModel.find();
      res.send(posts);
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "Validation error", details: error.message });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Server error", details: error.message });
    }
  }
};

const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findById(postId);
    if (post) {
      res.send(post);
    } else {
      res.status(StatusCodes.NOT_FOUND).send("Poast not found");
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "Validation error", details: error.message });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Server error", details: error.message });
    }
  }
};

const getPostsBySender = async (req, res) => {
  try {
    const senderId = req.query.sender;

    const posts = await PostModel.find({ sender: senderId });
    res.send(posts);
  } catch (error) {
    if (error.name === "ValidationError") {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "Validation error", details: error.message });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Server error", details: error.message });
    }
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;

    const post = await PostModel.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true, runValidators: true }
    );
    if (post) {
      res.send(post);
    } else {
      res.status(StatusCodes.NOT_FOUND).send("Post not found");
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "Validation error", details: error.message });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Server error", details: error.message });
    }
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getPostsBySender,
  updatePost,
};
