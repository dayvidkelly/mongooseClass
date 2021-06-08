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
  () => {
    console.log("................................................");
    console.log(`${os.hostname()}:${port} has connected to database`);
    console.log("................................................");
  }
);
//--------------------------------------------------------------------------------------------------------
//Listening...
app.listen(port, () => {
  console.clear();
  console.log("................................................");
  console.log(
    `${os.hostname()}:${port} is listening on http://localhost:${port}/`
  );
});
