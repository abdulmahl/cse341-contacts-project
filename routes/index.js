const indexRouter = require("express").Router();

indexRouter.use("/", require("./swagger"));

indexRouter.get("/", (req, res) => {
  //#swagger.tags=["Hello Swagger"]
  res.send("Hello Swagger");
});

indexRouter.use("/users", require("./router"));

module.exports = indexRouter;
