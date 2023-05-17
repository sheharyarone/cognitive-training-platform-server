const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const memoryGameRoutes = require("./routes/memoryGameRoutes");
const whackaMoleData = require("./routes/whackaMoleGameRoutes");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to the database
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);

// Middleware
app.use(express.json());

// Routes
app.use(authRoutes);
app.use(whackaMoleData);
app.use(memoryGameRoutes);

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
