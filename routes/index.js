var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  res.render("index", { title: "Orangina DAM" });
});

module.exports = router;
