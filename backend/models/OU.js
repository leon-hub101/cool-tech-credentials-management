const mongoose = require("mongoose");

const ouSchema = new mongoose.Schema({
  name: { type: String, required: true },
  divisions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Division" }],
});

module.exports = mongoose.model("OU", ouSchema);
