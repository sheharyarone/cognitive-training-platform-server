const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(express.json());
app.use(cors());
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "ygcvgvjkhbjnytchfvgjbnhcfvghbm()hgvjg345?/98";

const mongoURL = "mongodb+srv://admin:0000@cluster0.nobdfdc.mongodb.net/test";

// MONGODB CONNECTION
mongoose
  .connect(mongoURL, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected.."))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("server started");
});

// API TESTING POST CAN SEND AND RECIEVE
app.post("/post", async (req, res) => {
  console.log(req.body);
  const { data } = req.body;
  try {
    if (data == "ad") {
      res.send({ status: "ok" });
    } else {
      res.send({ status: "user not found" });
    }
  } catch (error) {
    res.send({ status: "something wrong try again later" });
  }
});

require("./userDetails");
const User = mongoose.model("UserInfo");

// API for PUTTING SOME DATA INTO SCHEMA
app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    // CHECKING IF EMAIL IS ALREADY REGISTERED OR NOT
    const oldUser = await User.findOne({ email }); // await will basically allow the function to match the data otherwise it will be true
    if (oldUser) {
      return res.send({ status: "user already registered" });
    }
    await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error f" });
  }
});
//LOGIN API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.send({ status: "user not registered" });
    }
    if (await bcrypt.compare(password, userExist.password)) {
      const token = jwt.sign({ email: userExist.email }, JWT_SECRET);
      if (res.status(201)) {
        return res.json({ status: "ok", data: token });
      } else {
        return res.json({ error: "error" });
      }
    }
    return res.json({ status: "error", error: "inValid Password" });
  } catch (error) {}
});
// USER DETAILS API
app.post("/userDetails", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;
    User.findOne({ email: useremail }).then((data) => {
      console.log(data);
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});
