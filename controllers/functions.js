const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDB().collection("users").find();
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const getOne = async (req, res) => {
  const objectId = new ObjectId(req.params._id);
  const result = await mongodb
    .getDB()
    .collection("users")
    .findOne({ _id: objectId });
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(result);
};

module.exports = { getOne, getAll };
