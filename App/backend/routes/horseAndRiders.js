const express = require("express");
const router = express.Router();
const {
  // getHorsesAndRiders,
  getSpecificHorse,
  deleteHorseAndRider,
  createHAndR,
  updateHAndR
} = require("../controllers/horseAndRiderController");

// router.get("/", getHorsesAndRiders);
router.get("/", getSpecificHorse);
router.delete("/:HAndRID", deleteHorseAndRider);
router.post("/", createHAndR)
router.put("/:id", updateHAndR)

module.exports = router;
