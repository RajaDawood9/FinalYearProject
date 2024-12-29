const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { createTables } = require("./models/createTable.js");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./config/db.js");
// app.use(express.json());
// const authRoutes =
// const student = require("./routes/allUser.js");
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://fms-a2uj8tzlw-raja-dawoods-projects.vercel.app", 
      "https://fms-r94edfzf9-raja-dawoods-projects.vercel.app",
      "fms-f-raja-dawoods-projects.vercel.app",
      "https://fms-f.vercel.app/",
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

// Apply CORS options globally
app.use(cors(corsOptions));

// Ensure handling preflight OPTIONS requests
app.options("*", cors(corsOptions));  // Respond to OPTIONS requests


app.get("/",(req,res) => {
  res.json("Hello");
}

)
// app.use(express.json());
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());
createTables()
  .then(() => {
    console.log("Table creation or verification complete.");
  })
  .catch((error) => {
    console.error("Error occurred during table creation:", error);
  });
app.use("/api", require("./routes/userRoute.js"));
app.listen(process.env.BACKEND_PORT, () => console.log(`node server use nodemon runing port`));
