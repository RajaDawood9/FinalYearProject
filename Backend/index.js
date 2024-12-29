const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { createTables } = require("./models/createTable.js");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./config/db.js");

// CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://fms-a2uj8tzlw-raja-dawoods-projects.vercel.app", 
      "https://fms-r94edfzf9-raja-dawoods-projects.vercel.app",
      "https://fms-f-raja-dawoods-projects.vercel.app",
      "https://fms-f.vercel.app", // Removed trailing slash
      "http://localhost:5173",
    ];

    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow request from allowed origins
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle OPTIONS requests

// Middleware for parsing and cookies
app.use(bodyParser.json());
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
  res.json("Hello");
});

// Create tables in the database
createTables()
  .then(() => {
    console.log("Table creation or verification complete.");
  })
  .catch((error) => {
    console.error("Error occurred during table creation:", error);
  });

// Routes
app.use("/api", require("./routes/userRoute.js"));

// Start the server
app.listen(process.env.BACKEND_PORT, () =>
  console.log(`Node server running on port ${process.env.BACKEND_PORT}`)
);
