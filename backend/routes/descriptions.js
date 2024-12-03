const express = require("express");
const router = express.Router();
const Description = require("../models/Description");

// GET /api/descriptions
router.get("/", async (req, res) => {
  try {
    const descriptions = await Description.find();
    res.json(descriptions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
