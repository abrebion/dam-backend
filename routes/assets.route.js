const express = require("express");
const router = express.Router();
const assetModel = require("../models/asset.model");

router.get("/", async function(req, res, next) {
  try {
    const assets = await assetModel.find();
    res.status(200).json({
      message: "List of all assets",
      data: assets
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.post("/", async function(req, res, next) {
  try {
    const asset = await assetModel.create(req.body);
    res.status(200).json({
      message: "New asset created",
      data: asset
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.get("/:id", async function(req, res, next) {
  try {
    const asset = await assetModel.findById(req.params.id);
    res.status(200).json({
      message: "Read asset",
      data: asset
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.delete("/:id", async function(req, res, next) {
  try {
    const asset = await assetModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Asset deleted",
      data: asset
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.patch("/:id", async function(req, res, next) {
  try {
    const asset = await assetModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      message: "Asset updated",
      data: asset
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

module.exports = router;
