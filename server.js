const express = require("express");
const route = require("./routes/router");
const port = process.env.PORT || 3000;
const app = express();
const mongodb = require("./database/connect");
const cors = require("cors");

app.use(cors);
app.use("/", route);

mongodb.initDB((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port);
    console.log(`DB initialized, server Listening on port: ${port}`);
  }
});
