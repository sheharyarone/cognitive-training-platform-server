const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true, unique: true }, // no repition of email
    password: { type: String, require: true },
  },
  {
    collection: "UserInfo",
  }
);
const User = mongoose.model("UserInfo", UserDetailSchema);
module.exports = User;
