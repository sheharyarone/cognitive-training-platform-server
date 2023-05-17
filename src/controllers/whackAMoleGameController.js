// Import the GameData model
const whackaMoleData = require("../models/whackaMoleGameData_model");

// Define the function to save game data
exports.saveGameData = async (req, res) => {
  // Extract the totalTime and flips from the request body
  const { score, email } = req.body;
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString(); // Convert date to ISO 8601 format
  try {
    // Create a new instance of GameData model
    await whackaMoleData.create({
      email: email,
      date: formattedDate,
      score: score,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
};
