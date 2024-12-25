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
  origin: "http://localhost:5173",
  credentials: true, 
  optionSuccessStatus: 200,
};
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
