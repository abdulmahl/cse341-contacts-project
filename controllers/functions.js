const mongodb = require("../database/connect");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  //#swagger.tags=["Contacts"]
  const result = await mongodb.getDB().collection("users").find();
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
    // console.log(users);
  });
};

const getOneById = async (req, res) => {
  //#swagger.tags=["Contacts"]
  const objectId = new ObjectId(req.params.id);

  const result = await mongodb
    .getDB()
    .collection("users")
    .findOne({ _id: objectId });

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(result);
};

const createUser = async (req, res) => {
  //#swagger.tags=["Contacts"]
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthdate: req.body.birthdate,
  };

  const response = await mongodb.getDB().collection("users").insertOne(user);

  if (response.acknowledged > 0) {
    res.status(204).send(`Contact inserted successfully`);
  } else {
    res.status(500).json(response.error || "Error inserting contact");
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=["Contacts"]
  const userId = new ObjectId(req.params.id);
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthdate: req.body.birthdate,
  };

  const response = await mongodb
    .getDB()
    .collection("users")
    .updateOne({ _id: userId }, { $set: user });

  if (response.modifiedCount > 0) {
    res.status(204).send(`Contact updated successfully`);
  } else {
    console.error("Error updating contact:", response);
    res.status(500).json("Error updating contact");
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=["Contacts"]
  const userId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDB()
    .collection("users")
    .deleteOne({ _id: userId });

  if (response.deletedCount > 0) {
    res.status(200).send(`Contact deleted successfully`);
  } else {
    console.error("Error deleting contact:", response);
    res.status(500).json("Error deleting contact");
  }
};

module.exports = {
  getOneById,
  getAll,
  createUser,
  updateUser,
  deleteUser,
};
