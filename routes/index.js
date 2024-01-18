const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags=["I Got Swagger"]
  res.send("Hello Swagger Contacts");
});

router.use("/contacts", require("./router"));

module.exports = router;
