// Import required modules
const express = require("express");
const gameController = require("../controllers/memoryGameController");

// Create a router instance
const router = express.Router();

// Define the API endpoint to save game data
router.post("/memoryGameData", gameController.saveGameData);

// Export the router
module.exports = router;
