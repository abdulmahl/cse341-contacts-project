const route = require("express").Router();
const controller = require("../controllers/functions");

route.get("/", controller.getAll);
route.get("/:id", controller.getOneById);
route.post("/", controller.createUser);
route.put("/:id", controller.updateUser);
route.delete("/id", controller.deleteUser);

module.exports = route;
