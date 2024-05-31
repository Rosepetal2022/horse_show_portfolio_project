const express = require("express");
const router = express.Router();
const {
  getHorses,
  createHorse,
  updateHorse,
  deleteHorse
  
} = require("../controllers/horseController");

router.get("/", getHorses);
router.post("/", createHorse),
router.delete("/:HorseID", deleteHorse);
router.put("/:id", updateHorse)


module.exports = router;