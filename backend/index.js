// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Import routes
const userRoutes = require("./routes/userRoutes");
const credentialRoutes = require("./routes/credentials");
const userManagementRoutes = require("./routes/userManagement");
const divisionRoutes = require("./routes/divisionRoutes");
const descriptionsRoute = require("./routes/descriptions");

// Import the CredentialRepository model (this model is used in index.js)
const CredentialRepository = require("./models/CredentialRepository");

// Initialize dotenv to load environment variables
dotenv.config();

// Initialize the Express application
const app = express();

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Use user routes for /api/users
app.use("/api/users", userRoutes);
// Use credential routes for /api/credentials
app.use("/api/credentials", credentialRoutes);
// Use user management routes for /api/user-management
app.use("/api/user-management", userManagementRoutes);
// Use the division routes for /api/divisions
app.use("/api/divisions", divisionRoutes);
// Use the description routes for api/descriptions
app.use("/api/descriptions", descriptionsRoute);


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
