const express = require("express");
const router = express.Router();
const {
  getRiders,
  createRider,
  deleteRider,
  updateRider
} = require("../controllers/riderController");

router.get("/", getRiders);
router.post("/", createRider);
router.delete("/:RiderID", deleteRider);
router.put("/:id", updateRider);

module.exports = router;
