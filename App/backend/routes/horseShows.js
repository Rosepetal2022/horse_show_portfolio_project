const express = require("express");
const router = express.Router();
const {
  getHorseShows,
  createHorseShow,
  deleteHorseShow,
  updateHorseShow
  
} = require("../controllers/horseShowController");

router.get("/", getHorseShows);
router.post("/", createHorseShow);
router.delete("/:HorseShowID", deleteHorseShow);
router.put("/:id", updateHorseShow);

module.exports = router;
