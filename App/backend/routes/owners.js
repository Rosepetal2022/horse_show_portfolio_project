const express = require("express");
const router = express.Router();
const {
  getOwners,
  createOwner,
  updateOwner,
  deleteOwner
  
} = require("../controllers/ownerController");

router.get("/", getOwners);
router.post("/", createOwner);
router.delete("/:id", deleteOwner);
router.put("/:id", updateOwner);

module.exports = router;