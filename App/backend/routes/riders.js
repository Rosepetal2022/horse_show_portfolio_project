const express = require("express");
const router = express.Router();
const {
  getRiders,
  
} = require("../controllers/riderController");

router.get("/", getRiders);

module.exports = router;