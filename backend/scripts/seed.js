require("dotenv").config();
const mongoose = require("mongoose");
const OU = require("./models/OU");
const Division = require("./models/Division");

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
  await OU.deleteMany({});
  await Division.deleteMany({});

  const newsOU = new OU({ name: "News Management" });
  const savedNewsOU = await newsOU.save();

  const financeDivision = new Division({
    name: "Finance",
    ou: savedNewsOU._id,
  });
  await financeDivision.save();

  console.log("Sample data added successfully");
  mongoose.connection.close();
};

seedData();
