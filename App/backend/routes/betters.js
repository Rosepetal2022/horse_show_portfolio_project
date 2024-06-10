const express = require("express");
const router = express.Router();
const {
  getBetters,
  createBetters,
  deleteBetters, 
  updateBetters,
  
} = require("../controllers/betterController");

router.get("/", getBetters);
router.post("/", createBetters)
router.delete("/:BetterID", deleteBetters)
router.put("/:id", updateBetters)

module.exports = router;

