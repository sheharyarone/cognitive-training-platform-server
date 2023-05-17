const express = require("express");
const router = express.Router();
const mongoApi = require("../controllers/memoryGameDataRetrieve");

router.get("/memoryGameGetData", async (req, res) => {
  const { email } = req.query; // Update req.body to req.query
  console.log(req.query); // Log the query object to see the email value
  try {
    const gameData = await mongoApi.getAllGameData("memoryGameData", email);
    console.log(gameData);
    res.json(gameData);
  } catch (error) {
    console.error("Error retrieving game data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
