const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swaggerConfig");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:5173",
//   })
// );
let corsOptions = {
  origin: ["http://localhost:5173", "https://localhost:5173"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/user", require("./routes/users"));
app.use("/api/postcard", require("./routes/postcards"));
app.use("/api/assets", require("./routes/assets"));

module.exports = app;
