const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: String,
  nickName: String,
  password: String,
  follows: String,
});

module.exports = mongoose.model("User", UserSchema);