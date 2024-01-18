const express = require("express");
const route = express.Router();
const controller = require("../controllers/functions");

route.get("/", controller.getAll);
route.get("/:_id", controller.getOneById);
route.post("/add-user", controller.createUser);
route.put("/update-user", controller.updateUser);
route.delete("/delete-user", controller.deleteUser);

module.exports = route;
