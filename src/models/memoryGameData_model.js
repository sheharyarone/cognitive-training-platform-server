// Import required modules
const mongoose = require("mongoose");

// Define a schema for the game data
const gameDataSchema = new mongoose.Schema(
  {
    email: String,
    totalTime: Number,
    flips: Number,
  },
  {
    collection: "memoryGameData",
  }
);

// Create a model based on the schema
const memoryGameData = mongoose.model("GameData", gameDataSchema);

// Export the model
module.exports = memoryGameData;
