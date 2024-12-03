require("dotenv").config();
const mongoose = require("mongoose");
const OU = require("../models/OU");
const Division = require("../models/Division");
const Description = require("../models/Description"); // Import Description model

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

const seedData = async () => {
  try {
    // Clear the existing data
    await OU.deleteMany({});
    await Division.deleteMany({});
    await Description.deleteMany({});

    // Create Organizational Units
    const newsOU = new OU({ name: "News Management" });
    const softwareOU = new OU({ name: "Software Reviews" });
    const hardwareOU = new OU({ name: "Hardware Reviews" });
    const opinionOU = new OU({ name: "Opinion Publishing" });

    const savedNewsOU = await newsOU.save();
    const savedSoftwareOU = await softwareOU.save();
    const savedHardwareOU = await hardwareOU.save();
    const savedOpinionOU = await opinionOU.save();

    // Create Divisions for each OU
    const divisions = [
      { name: "Finance", ou: savedNewsOU._id },
      { name: "IT", ou: savedNewsOU._id },
      { name: "Writing", ou: savedNewsOU._id },
      { name: "Development", ou: savedSoftwareOU._id },
      { name: "QA", ou: savedSoftwareOU._id },
      { name: "Content Creation", ou: savedHardwareOU._id },
      { name: "Support", ou: savedHardwareOU._id },
      { name: "Marketing", ou: savedOpinionOU._id },
      { name: "Analysis", ou: savedOpinionOU._id },
    ];

    for (const division of divisions) {
      const newDivision = new Division(division);
      await newDivision.save();
    }

    // Create Descriptions for Credential Management
    const descriptions = [
      "WordPress Blog Admin Access",
      "FTP Access for Marketing Server",
      "Database Access for Finance Reports",
      "Server SSH Access",
      "Google Analytics Management Account",
      "Google Ads Management Account",
      "API Key for Payment Integration",
      "Development Server Access",
      "Staging Server Access",
      "Production Server Admin Access",
      "Social Media Account Access (Facebook/Instagram)",
      "Customer Support Portal Admin Credentials",
      "Email Server Access",
      "AWS Console Credentials",
      "Azure Subscription Admin",
    ];

    await Description.insertMany(descriptions.map((desc) => ({ name: desc })));

    console.log(
      "Sample data added successfully, including Organizational Units, Divisions, and Descriptions"
    );
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
