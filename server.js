const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const mongodb = require("./database/connect");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.status(200);
  next();
});

app.use("/", require("./routes"));

mongodb.initDB((err) => {
  if (err) {
    console.error("Error initializing database", err);
    process.exit(0);
  } else {
    app.listen(port, () => {
      console.log(`DB initialized, server running on port: ${port}`);
    });
  }
});
