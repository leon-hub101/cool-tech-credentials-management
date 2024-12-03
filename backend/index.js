// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import user routes
const userRoutes = require("./routes/userRoutes");
const credentialRoutes = require("./routes/credentials");
const userManagementRoutes = require("./routes/userManagement");

// Initialize dotenv to load environment variables
dotenv.config();

// Initialize the Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Use the user routes for /api/users
app.use("/api/users", userRoutes);
// Use the credential routes for /api/credentials
app.use("/api", credentialRoutes);
// Use the user management routes for /api/user-management
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
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server only if MongoDB connects successfully
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
