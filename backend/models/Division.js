const mongoose = require("mongoose");

const divisionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ou: { type: mongoose.Schema.Types.ObjectId, ref: "OU" },
  credentials: [
    { type: mongoose.Schema.Types.ObjectId, ref: "CredentialRepository" },
  ],
});

module.exports = mongoose.model("Division", divisionSchema);
