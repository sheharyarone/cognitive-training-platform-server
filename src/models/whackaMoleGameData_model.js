// Import required modules
const mongoose = require("mongoose");

// Define a schema for the game data
const gameDataSchema = new mongoose.Schema(
  {
    email: String,
    date: Date,
    score: Number,
  },
  {
    collection: "whackaMoleData",
  }
);

// Create a model based on the schema
const whackaMoleData = mongoose.model("whackaMoleData", gameDataSchema);

// Export the model
module.exports = whackaMoleData;
