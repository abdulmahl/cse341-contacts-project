const swaggerRouter = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../swagger.json");

swaggerRouter.use("/api-docs", swaggerUi.serve);
swaggerRouter.get("/api-docs", swaggerUi.setup(swaggerDoc));

module.exports = swaggerRouter;
