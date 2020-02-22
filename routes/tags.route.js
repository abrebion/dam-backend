var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  res.json({
    tags: "tags"
  });
});

module.exports = router;
