const express = require("express");
const router = express.Router();
const Division = require("../models/Division");

// GET /api/divisions - Fetch all divisions
router.get("/", async (req, res) => {
  try {
    const divisions = await Division.find();
    res.status(200).json(divisions);
  } catch (err) {
    console.error("Error fetching divisions:", err);
    res.status(500).json({ message: "Error fetching divisions" });
  }
});

module.exports = router;
