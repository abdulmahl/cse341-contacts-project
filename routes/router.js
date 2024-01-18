const route = require("express").Router();
const controller = require("../controllers/functions");

route.get("/", (req, res) => {
    //#swagger.tags=["Hello Swagger"]
  res.send("Hello Swagger World");
});

route.get("/", (req, res) => {
  res.send("Hello Web Services");
});

route.get("/users", controller.getAll);
route.get("/:id", controller.getOneById);
route.post("/", controller.createUser);
route.put("/:id", controller.updateUser);
route.delete("/:id", controller.deleteUser);
route.use("/", require("./swagger"));

module.exports = route;
