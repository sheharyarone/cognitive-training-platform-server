const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true }, // no repition of email
    password: String,
  },
  {
    collection: "UserInfo",
  }
);
mongoose.model("UserInfo", UserDetailSchema);
