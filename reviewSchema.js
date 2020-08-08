const mongoose = require("mongoose");

let ReviewSchema = new mongoose.Schema({
  
  review:String
});

const Review = new mongoose.model("Review", ReviewSchema);
module.exports = Review;
