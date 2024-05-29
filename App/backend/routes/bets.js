const express = require("express");
const router = express.Router();
const {
  getBets,
  
} = require("../controllers/betController");

router.get("/", getBets);

module.exports = router;