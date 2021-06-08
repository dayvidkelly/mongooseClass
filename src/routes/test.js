const express = require("express");
const router = express.Router();
const Database = require("../utilities/database");
const database = new Database();
//--------------------------------------------------------------------------------------------------------
router.get("/", async (req, res) => {
  let doc = await database.selectAll("all_warehouses");
  res.send(doc);
});

router.get("/:id", async (req, res) => {
  console.clear();
  let doc = await database.getSingleById("warehouses", req.params.id);
  res.send(doc);
});

router.post("/", async (req, res) => {
  console.clear();
  let newDoc = await database.insertOne("warehouses", req.body);
  res.send(newDoc);
});
//--------------------------------------------------------------------------------------------------------
module.exports = router;
