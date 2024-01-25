const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();
require("./database/connect");

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

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
