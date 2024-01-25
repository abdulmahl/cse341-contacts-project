const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  favoriteColor: String,
  birthdate: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("contacts", contactSchema);
