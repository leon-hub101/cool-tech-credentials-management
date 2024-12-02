const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the service/account
  username: { type: String, required: true },
  password: { type: String, required: true },
  division: { type: mongoose.Schema.Types.ObjectId, ref: "Division" },
});

module.exports = mongoose.model("CredentialRepository", credentialSchema);
