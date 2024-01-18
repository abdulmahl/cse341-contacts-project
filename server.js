const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const mongodb = require("./database/connect");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/users", require("./routes/router"));

mongodb.initDB((err) => {
  if (err) {
    console.error("Error initializing database", err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`DB initialized, server running on port: ${port}`);
    });
  }
});
