const express = require("express");
const router = express.Router();
const CredentialRepository = require("../models/CredentialRepository");
const verifyJWT = require("../middleware/auth");

// GET /division/:divisionId/credentials
router.get("/division/:divisionId/credentials", verifyJWT, async (req, res) => {
  try {
    const { divisionId } = req.params;
    const credentials = await CredentialRepository.findOne({ divisionId });
    if (!credentials) {
      return res
        .status(404)
        .json({ message: "Credentials not found for this division" });
    }
    res.json(credentials);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /division/:divisionId/credentials
router.post(
  "/division/:divisionId/credentials",
  verifyJWT,
  async (req, res) => {
    try {
      const { divisionId } = req.params;
      const { username, password, description } = req.body;

      // Find the credential repository or create a new one
      let repository = await CredentialRepository.findOne({ divisionId });
      if (!repository) {
        repository = new CredentialRepository({ divisionId, credentials: [] });
      }

      // Add the new credential to the repository
      repository.credentials.push({ username, password, description });
      await repository.save();

      res.status(201).json(repository);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// PUT /credentials/:credentialId
router.put("/credentials/:credentialId", verifyJWT, async (req, res) => {
  try {
    const { credentialId } = req.params;
    const { username, password, description } = req.body;

    const repository = await CredentialRepository.findOneAndUpdate(
      { "credentials._id": credentialId },
      {
        $set: {
          "credentials.$.username": username,
          "credentials.$.password": password,
          "credentials.$.description": description,
        },
      },
      { new: true }
    );

    if (!repository) {
      return res.status(404).json({ message: "Credential not found" });
    }

    res.json(repository);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
