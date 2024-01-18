const { MongoClient } = require("mongodb");
require("dotenv/config");
const uri = process.env.MONGO_URI;
const contact = new MongoClient(uri);

let _db;

const initDB = (callback) => {
  if (_db) {
    console.log("Database initialized");
    return callback(null, _db);
  }
  contact.connect(uri)
    .then((client) => {
      _db = client.db();
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDB = () => {
  if (!_db) {
    console.log("Database not initialized");
  } else {
    return _db;
  }
};

const closeDB = () => {
  if (_db) {
    contact.close();
    console.log("Database connection closed");
  }
};

module.exports = { initDB, getDB, closeDB };
