// Import required modules
const express = require("express");
const whackAMoleGame = require("../controllers/whackAMoleGameController");

// Create a router instance
const router = express.Router();

// Define the API endpoint to save game data
router.post("/whackaMoleData", whackAMoleGame.saveGameData);

// Export the router
module.exports = router;
