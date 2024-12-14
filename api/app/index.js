const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);

module.exports = app;
