const express = require("express");
const router = express.Router();
const assetModel = require("../models/asset.model");
const collectionModel = require("../models/collection.model");
const urlQueryToMongoQuery = require("query-to-mongo");

router.get("/", async function(req, res, next) {
  try {
    const assets = await assetModel.find();
    res.status(200).json(assets);
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

router.get("/search", async function(req, res, next) {
  try {
    const query = urlQueryToMongoQuery(req.query);
    // console.log("Mongo Query", query);
    const assets = await assetModel.find(query.criteria, query.options.fields, { sort: query.options.sort, limit: query.options.limit });
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

// Get distinct brands
router.get("/brands/", async function(req, res, next) {
  try {
    const assets = await assetModel.distinct("meta_brand");
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

// Get distinct recipes
router.get("/recipes/", async function(req, res, next) {
  try {
    const assets = await assetModel.distinct("meta_recipe");
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

// Get distinct flavours
router.get("/flavours/", async function(req, res, next) {
  try {
    const assets = await assetModel.distinct("meta_flavour");
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

// Get distinct packagings
router.get("/packagings/", async function(req, res, next) {
  try {
    const assets = await assetModel.distinct("meta_packaging");
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

// Get distinct capacities
router.get("/capacities/", async function(req, res, next) {
  try {
    const assets = await assetModel.distinct("meta_capacity");
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

// Get distinct formats
router.get("/formats/", async function(req, res, next) {
  try {
    const assets = await assetModel.distinct("meta_format");
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

// Get distinct ean codes
router.get("/eans/", async function(req, res, next) {
  try {
    const assets = await assetModel.distinct("meta_ean13");
    res.status(200).json(assets);
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
    const collections = await collectionModel.updateMany({ assets: { $in: req.params.id } }, { $pull: { assets: req.params.id } }, { multi: true });
    res.status(200).json({
      message: "Asset deleted",
      data: {
        asset: asset,
        collections: collections
      }
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
