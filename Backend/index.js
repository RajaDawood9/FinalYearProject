const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./config/db.js");
const { createTables } = require("./models/createTable.js");

const app = express();

// Define allowed origins
const allowedOrigins = [
  "https://fms-a2uj8tzlw-raja-dawoods-projects.vercel.app",
  "https://fms-r94edfzf9-raja-dawoods-projects.vercel.app",
  "https://fms-f-raja-dawoods-projects.vercel.app",
  "https://fms-f.vercel.app",
  "http://localhost:5173"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow request
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies
  optionsSuccessStatus: 200, // For older browsers
};

// Apply CORS globally before other middleware
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Preflight Request Handling
app.options("*", cors(corsOptions)); // Explicitly handle OPTIONS requests

// Routes
app.get("/", (req, res) => {
  res.json("Hello");
});

app.use("/api", require("./routes/userRoute.js"));

// Create tables and start server
createTables()
  .then(() => {
    console.log("Table creation or verification complete.");
  })
  .catch((error) => {
    console.error("Error occurred during table creation:", error);
  });

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Server running on port ${process.env.BACKEND_PORT}`);
});

// const express = require("express");
// const cors = require("cors");
// const app = express();
// app.use(cors());
// const bodyParser = require("body-parser");
// const { createTables } = require("./models/createTable.js");
// const cookieParser = require("cookie-parser");
// require("dotenv").config();
// require("./config/db.js");
// // app.use(express.json());
// // const authRoutes =
// // const student = require("./routes/allUser.js");
// const corsOptions = {
//   origin: (origin, callback) => {
//     const allowedOrigins = [
//       "https://fms-a2uj8tzlw-raja-dawoods-projects.vercel.app",
//       "https://fms-r94edfzf9-raja-dawoods-projects.vercel.app",
//       "https://fms-f-raja-dawoods-projects.vercel.app",
//       "https://fms-f.vercel.app",
//       "http://localhost:5173",
//     ];

//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true); // Allow request from allowed origins
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

// // Apply CORS options globally

// // Ensure handling preflight OPTIONS requests
// // app.options("*", cors(corsOptions)); // Respond to OPTIONS requests

// app.get("/", (req, res) => {
//   res.json("Hello");
// });
// // app.use(express.json());
// app.use(bodyParser.json());
// app.use(cors(corsOptions));
// app.use(cookieParser());
// createTables()
//   .then(() => {
//     console.log("Table creation or verification complete.");
//   })
//   .catch((error) => {
//     console.error("Error occurred during table creation:", error);
//   });
// app.use("/api", require("./routes/userRoute.js"));
// app.listen(process.env.BACKEND_PORT, () =>
//   console.log(`node server use nodemon runing port`)
// );
