// Import the GameData model
const memoryGameData = require("../models/memoryGameData_model");

// Define the function to save game data
exports.saveGameData = async (req, res) => {
  // Extract the totalTime and flips from the request body
  const { totalTime, flips, email } = req.body;
  try {
    // Create a new instance of GameData model
    await memoryGameData.create({
      email: email,
      totalTime: totalTime,
      flips: flips,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
};
