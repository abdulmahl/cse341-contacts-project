const mongodb = require("../database/connect");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  const result = await mongodb.getDB().collection("users").find();
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
    // console.log(users);
  });
};

const getOneById = async (req, res) => {
  const objectId = new ObjectId(req.params._id);
  const result = await mongodb
    .getDB()
    .collection("users")
    .findOne({ _id: objectId });
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(result);
};

const createUser = async (req, res) => {
  const user = {
    fullname: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    },
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthdate: req.body.birthdate,
  };
  const response = await mongodb.getDB().collection("users").insertOne(user);
  if (response.acknowledged > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Error inserting user");
  }
};

const updateUser = async (req, res) => {
  const userId = Object(req.params._id);
  const user = {
    fullname: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    },
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthdate: req.body.birthdate,
  };
  const response = await mongodb
    .getDB()
    .collection("users")
    .replaceOne({ _id: userId }, user);
  if (response.modifiedCount > 0) {
    res.status(204).send(response);
  } else {
    res.status(500).json(response.error || "Error updating user");
  }
};

const deleteUser = async (req, res) => {
  const userId = Object(req.params._id);
  const response = await mongodb
    .getDB()
    .collection("users")
    .deleteOne({ _id: userId }, true);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || "Error deleting user");
  }
};

module.exports = {
  getOneById,
  getAll,
  createUser,
  updateUser,
  deleteUser,
};
