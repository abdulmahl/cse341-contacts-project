const express = require("express");
const route = express.Router();
const controller = require("../controllers/functions");

route.get("/", controller.getAll);

route.get("/:_id", controller.getOne);

module.exports = route;
