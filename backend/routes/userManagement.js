// **backend/routes/userManagement.js**: User Management Routes
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyJWT = require("../middleware/auth");

// Middleware to check if user is an admin
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, admin only" });
  }
  next();
};

// POST /assign-user: Assign a user to a division or OU
router.post("/assign-user", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const { userId, divisionId, ouId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (divisionId) user.divisionId = divisionId;
    if (ouId) user.ouId = ouId;
    await user.save();

    res.status(200).json({ message: "User assigned successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /unassign-user: Remove a user from a division or OU
router.delete("/unassign-user", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.divisionId = null;
    user.ouId = null;
    await user.save();

    res.status(200).json({ message: "User unassigned successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /user/:userId/role: Change a user's role
router.put("/user/:userId/role", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: "User role updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
