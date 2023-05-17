const memoryGameData = require("../models/memoryGameData_model");

// Function to fetch game data from a specific collection for a given email
const getAllGameData = async (collectionName, email) => {
  console.log(email);
  try {
    const collection = memoryGameData.db.collection(collectionName);
    const gameDataCursor = await collection.find({ email });
    const gameData = await gameDataCursor.toArray();
    const simplifiedGameData = gameData.map(({ date, totalTime, flips }) => ({
      date,
      totalTime,
      flips,
    }));
    return simplifiedGameData;
  } catch (error) {
    console.error("Error fetching game data:", error);
    throw error;
  }
};

module.exports = {
  getAllGameData,
};
