const express = require("express");
const router = express.Router();
const {
  getBetters,
  
} = require("../controllers/betterController");

router.get("/", getBetters);

module.exports = router;