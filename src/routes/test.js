const express = require("express");
const router = express.Router();
const Database = require("../utilities/database");
const database = new Database();
//--------------------------------------------------------------------------------------------------------
router.get("/", async (req, res) => {
  res.send(`Hello World ${req.headers["x-real-ip"]}`);
});
//--------------------------------------------------------------------------------------------------------
module.exports = router;
