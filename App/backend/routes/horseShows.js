const express = require("express");
const router = express.Router();
const {
  getHorseShows,
  
} = require("../controllers/horseShowController");

router.get("/", getHorseShows);

module.exports = router;