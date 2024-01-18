const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const mongodb = require("./database/connect");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use("/users", require("./routes/router"));

mongodb.initDB((err, res) => {
  if (err) {
    console.error(err);
    res.status(500).send("Error initializing database");
  } else {
    app.listen(port);
    console.log(`DB initialized, server running on port: ${port}`);
  }
});
