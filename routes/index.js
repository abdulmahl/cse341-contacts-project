const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    //#swagger.tags=["Hello Swagger"]
  res.send("Hello Swagger World");
});

module.exports = router;
