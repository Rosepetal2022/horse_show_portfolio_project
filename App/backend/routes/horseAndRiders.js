const express = require("express");
const router = express.Router();
const {
  getHorsesAndRiders,
  
} = require("../controllers/horseAndRiderController");

router.get("/", getHorsesAndRiders);

module.exports = router;