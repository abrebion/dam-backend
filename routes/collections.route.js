const express = require("express");
const router = express.Router();
const collectionModel = require("../models/collection.model");

router.get("/", async function(req, res, next) {
  try {
    const collections = await collectionModel.find();
    res.status(200).json({
      message: "List of all collections",
      data: collections
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.post("/", async function(req, res, next) {
  try {
    const collection = await collectionModel.create(req.body);
    res.status(200).json({
      message: "New collection created",
      data: collection
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.get("/:id", async function(req, res, next) {
  try {
    const collection = await collectionModel.findById(req.params.id);
    res.status(200).json({
      message: "Read collection",
      data: collection
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.delete("/:id", async function(req, res, next) {
  try {
    const collection = await collectionModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "collection deleted",
      data: collection
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.patch("/:id", async function(req, res, next) {
  try {
    const collection = await collectionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      message: "collection updated",
      data: collection
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

module.exports = router;
