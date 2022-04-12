//moon
// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   userId: String,
//   nickName: String,
//   hashedpassword: String,
//   follows: String,
// });

// module.exports = mongoose.model("User", UserSchema);


const mongoose = require("mongoose");
const moment = require("moment");

const UserSchema = new mongoose.Schema({
  userId: String,
  nickName: String,
  hashedpassword: String,
  startTime: String,
  totalTime:Number,
  connecting:Boolean,
  userIamge:String,
  friendList:[],
});

module.exports = mongoose.model("User", UserSchema);