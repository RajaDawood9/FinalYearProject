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
const allowedOrigins = [
  "https://fms-a2uj8tzlw-raja-dawoods-projects.vercel.app", // Add your frontend URLs here
  "https://fms-r94edfzf9-raja-dawoods-projects.vercel.app/",
  "http://localhost:5173",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      // Allow requests with no origin (like mobile apps or Postman)
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

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
