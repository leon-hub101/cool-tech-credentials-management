// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import user routes
const userRoutes = require("./routes/userRoutes");
const credentialRoutes = require("./routes/credentials");
const userManagementRoutes = require("./routes/userManagement");

// Import CredentialRepository model
const CredentialRepository = require("./models/CredentialRepository");

// Initialize dotenv to load environment variables
dotenv.config();

// Initialize the Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Use the user routes for /api/users
app.use("/api/users", userRoutes);
// Use the credential routes for /api
app.use("/api", credentialRoutes);
// Use the user management routes for /api
app.use("/api", userManagementRoutes);

// Basic route to verify the server is running
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Health check route
app.get("/health", async (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
  res.json({ status: "Backend is running!", database: dbStatus });
});

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    // Log division IDs (temporary logging)
    try {
      const divisions = await CredentialRepository.find();
      divisions.forEach((division) =>
        console.log("Division ID:", division._id)
      );
    } catch (err) {
      console.error("Error retrieving divisions:", err);
    }

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
