var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  res.json({
    assets: "assets"
  });
});

module.exports = router;
