const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();
require("./database/connect");

app.use(cors());
app.use(express.json());

app.use("/", require("./routes"));

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
