const bcrypt = require("bcrypt");
const User = require("../models/userDetails");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require("crypto");

const verificationToken = crypto.randomBytes(16).toString("hex");
const JWT_SECRET = process.env.JWT_SECRET;

// SIGN UP API
exports.signup = async (req, res) => {
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
      verificationToken: verificationToken,
      isVerified: false,
    });

    // Send verification email to the user
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE_PROVIDER,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_SENDER_ADDRESS,
      to: email,
      subject: "Account Verification",
      text: `Please click the following link to verify your account: ${verificationToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending verification email:", error);
        return res.send({ status: "error" });
      }
      console.log("Verification email sent:", info.response);
      res.send({ status: "ok" });
    });
  } catch (error) {
    res.send({ status: "error" });
  }
};

// LOGIN API
exports.login = async (req, res) => {
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
  } catch (error) {
    res.json({ status: "not working" });
  }
};

// USER INFO API
exports.userInfo = async (req, res) => {
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
};
