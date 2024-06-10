const express = require("express");
const router = express.Router();
const {
  getBets,
  deleteBet,
  updateBet, 
  createBet
  
} = require("../controllers/betController");

router.get("/", getBets);
router.delete("/:BetID", deleteBet);
router.post("/", createBet);
router.put("/:id", updateBet)

module.exports = router;