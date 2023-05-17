const express = require("express");
const router = express.Router();
const mongoApi = require("../controllers/whackAMoleDataRetrieve");

router.get("/whackaMoleGetData", async (req, res) => {
  const { email } = req.body;
  try {
    const gameData = await mongoApi.getAllGameData("whackaMoleData", email);
    console.log(gameData);
    res.json(gameData);
  } catch (error) {
    console.error("Error retrieving game data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
