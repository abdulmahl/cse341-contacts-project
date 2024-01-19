const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags=["I Got Swagger"]
  res.send(
    "<center><h1 style='color:crimson; padding-top: 15rem; font-size:6rem'>This is the CSE 341 Contacts Project Home Page: Part-2</h1></center>"
  );
});

router.use("/contacts", require("./router"));

module.exports = router;
