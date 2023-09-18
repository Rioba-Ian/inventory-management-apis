const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello things are working.");
});

module.exports = router;
