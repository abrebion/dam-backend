const express = require("express");
const router = express.Router();
const tagModel = require("../models/tag.model");

router.get("/", async function(req, res, next) {
  try {
    const tags = await tagModel.find();
    res.status(200).json({
      message: "List of all tags",
      data: tags
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.post("/", async function(req, res, next) {
  try {
    const tag = await tagModel.create(req.body);
    res.status(200).json({
      message: "New tag created",
      data: tag
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.get("/:id", async function(req, res, next) {
  try {
    const tag = await tagModel.findById(req.params.id);
    res.status(200).json({
      message: "Read tag",
      data: tag
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.delete("/:id", async function(req, res, next) {
  try {
    const tag = await tagModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Tag deleted",
      data: tag
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.patch("/:id", async function(req, res, next) {
  try {
    const tag = await tagModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      message: "Tag updated",
      data: tag
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

module.exports = router;
