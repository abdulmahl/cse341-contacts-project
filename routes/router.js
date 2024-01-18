const route = require("express").Router();
const controller = require("../controllers/functions");

route.get("/", controller.getAll);
route.get("/:_id", controller.getOneById);
route.post("/", controller.createUser);
route.patch("/:_id", controller.updateUser);
route.delete("/_id", controller.deleteUser);

module.exports = route;
