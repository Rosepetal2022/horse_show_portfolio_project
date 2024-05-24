const express = require("express");
const router = express.Router();
const {
  getHorses,
  
} = require("../controllers/horseController");

router.get("/", getHorses);


module.exports = router;