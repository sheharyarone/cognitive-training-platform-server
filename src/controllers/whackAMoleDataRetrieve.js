const whackaMoleData = require("../models/whackaMoleGameData_model");

// Function to fetch game data from a specific collection for a given email
const getAllGameData = async (collectionName, email) => {
  console.log(email);
  try {
    const collection = whackaMoleData.db.collection(collectionName);
    const gameData = await collection.find({ email }).toArray();
    const simplifiedGameData = gameData.map(({ score, date }) => ({
      score,
      date,
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
