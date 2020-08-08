const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  addressMail: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = new mongoose.model("User", UserSchema);
module.exports = User;
