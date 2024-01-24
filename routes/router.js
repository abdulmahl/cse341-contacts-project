const route = require("express").Router();
const controller = require("../controllers/functions");

route.get("/", controller.getAll);
route.get("/:id", controller.getOneById);

route.post("/createContact", controller.createContact);
route.put("/:id", controller.updateContact);
route.delete("/:id", controller.deleteContact);

module.exports = route;
