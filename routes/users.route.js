const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");
const collectionModel = require("../models/collection.model");

router.get("/", async function(req, res, next) {
  try {
    const users = await userModel.find();
    res.status(200).json({
      message: "List of all users",
      data: users
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.post("/", async function(req, res, next) {
  try {
    const { firstname, lastname, email, password, role, status } = req.body;
    const newUser = new userModel({
      firstname,
      lastname,
      email,
      password,
      role,
      status
    });
    newUser.setPassword(password);
    await newUser.save(req.body);
    res.status(200).json({
      message: "New user created",
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      data: error
    });
  }
});

router.get("/:id", async function(req, res, next) {
  try {
    const user = await userModel.findById(req.params.id);
    res.status(200).json({
      message: "Read user",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.get("/:id/collections", async function(req, res, next) {
  try {
    const collections = await collectionModel.find({ user: req.params.id });
    res.status(200).json({
      message: "Read user collections",
      data: collections
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.delete("/:id", async function(req, res, next) {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    const collections = await collectionModel.deleteMany({ user: req.params.id });
    res.status(200).json({
      message: "User and his collections were deleted",
      user: user,
      collections: collections
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.patch("/:id", async function(req, res, next) {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      message: "User updated",
      user: user
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

module.exports = router;
