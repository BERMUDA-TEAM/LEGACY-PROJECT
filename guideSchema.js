const mongoose = require("mongoose");

//declaration of guide schema
let guideSchema = new mongoose.Schema({
  name: String,
  description: String,
  age: String,
  gender: String,
  languages: [String],
  city: String,
  phone: String,
  email: String,
  fileName: { type: String },
});

const Guide = new mongoose.model("Guide", guideSchema);
module.exports = Guide;
