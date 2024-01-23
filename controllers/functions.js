const mongodb = require("../database/connect");
const { ObjectId } = require("mongodb");
const contactSchema = require("../models/validate");

const getAll = async (req, res) => {
  //#swagger.tags=["Contacts"]
  try {
    const result = await mongodb.getDB().collection("contacts").find();
    result.toArray().then((contacts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts);
      // console.log(contacts);
    });
  } catch (err) {
    if (err) {
      res.status(422).json({ message: err });
    }
  }
};

const getOneById = async (req, res) => {
  //#swagger.tags=["Contacts"]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(422).json({
      message: "Error: must use a valid contact id to get a contact!",
    });
  }
  const objectId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDB()
      .collection("contacts")
      .findOne({ _id: objectId });
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    res.status(422).json({ message: err });
  }
};

const createContact = async (req, res) => {
  //#swagger.tags=["Contacts"]
  const contact = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthdate: req.body.birthdate,
  };

  const { error } = contactSchema.validate(contact);
  if (error) {
    return res
      .status(422)
      .json({ error: error.details.map((detail) => detail.message) });
  }

  const response = await mongodb
    .getDB()
    .collection("contacts")
    .insertOne(contact);
  if (response.acknowledged > 0) {
    res.status(204).send();
  }
};

const updateContact = async (req, res) => {
  //#swagger.tags=["Contacts"]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(422).json({
      message: "Error: must use a valid contact id to update a contact!",
    });
  }
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthdate: req.body.birthdate,
  };

  const { error } = contactSchema.validate(contact);
  if (error) {
    return res
      .status(422)
      .json({ error: error.details.map((detail) => detail.message) });
  }

  const response = await mongodb
    .getDB()
    .collection("contacts")
    .updateOne({ _id: contactId }, { $set: contact });
  if (response.modifiedCount > 0) {
    res.status(204).send();
  }
};

const deleteContact = async (req, res) => {
  //#swagger.tags=["Contacts"]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(422).json({
      message: "Error: must use a valid contact id to delete a contact!",
    });
  }
  const contactId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDB()
    .collection("contacts")
    .deleteOne({ _id: contactId });

  if (response.deletedCount > 0) {
    res.status(200).send("Contact deleted successfully");
  } else {
    console.error("Error deleting contact:", response);
    res.status(500).json("Error deleting contact");
  }
};

module.exports = {
  getOneById,
  getAll,
  createContact,
  updateContact,
  deleteContact,
};
