const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  userName: String,
  addressMail: String,
  firstName: String,
  lastName: String,
  password: String,
});

const User = new mongoose.model("User", UserSchema);
module.exports = User;
