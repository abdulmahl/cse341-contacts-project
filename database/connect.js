const mongoose = require("mongoose");
require("dotenv/config");
const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Mongodb database initialized...");
  })
  .catch((err) => {
    console.error("Mongodb database NOT initialized...", err);
  });

process.on("SIGINT", () => {
  mongoose.connection.close();
  console.log("Mongodb connection closed!");
  process.exit(0);
});

module.exports = mongoose;
