const whackaMoleData = require("../models/whackaMoleGameData_model");

// Function to fetch game data from a specific collection for a given email
const getAllGameData = async (collectionName, email) => {
  try {
    const collection = whackaMoleData.db.collection(collectionName);
    const gameData = await collection.find().toArray();
    return gameData;
  } catch (error) {
    console.error("Error fetching game data:", error);
    throw error;
  }
};

module.exports = {
  getAllGameData,
};
