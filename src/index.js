const express = require("express");
const app = express();
var os = require("os");
const port = 3000;
//--------------------------------------------------------------------------------------------------------
const mongoose = require("mongoose");
require("dotenv/config");
//--------------------------------------------------------------------------------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//--------------------------------------------------------------------------------------------------------
const test = require("../src/routes/test");
app.use("/", test);
//--------------------------------------------------------------------------------------------------------
//Connect to database:
mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to database"),
  console.log("/................................................")
);
//--------------------------------------------------------------------------------------------------------
app.listen(port, () => {
  console.clear();
  console.log(os.hostname() + ":" + port);
});
