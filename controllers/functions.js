const { ObjectId } = require("mongodb");
const joiContact = require("../models/validate");
const Contact = require("../models/contact");

const getAll = async (req, res) => {
  try {
  //#swagger.tags=["All contacts"]
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOneById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({
      error: "Invalid contact id",
    });
  }
  const objectId = new ObjectId(req.params.id);
  try {
  //#swagger.tags=["One contact by id"]
    const result = await Contact.findOne({ _id: objectId });
    if (!result) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createContact = async (req, res) => {
  const contact = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthdate: req.body.birthdate,
  };

  const { error } = joiContact.validate(contact);
  if (error) {
    return res.status(422).json({ error: error.details.map((detail) => detail.message) });
  }
  try {
  //#swagger.tags=["Create a contact"]
    const response = await Contact.create(contact);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({
      error: "Invalid contact id",
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

  const { error } = joiContact.validate(contact);
  if (error) {
    return res.status(422).json({ error: error.details.map((detail) => detail.message) });
  }

  try {
  //#swagger.tags=["Update contact by id"]
    const response = await Contact.updateOne(
      { _id: contactId },
      { $set: contact }
    );
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Contact not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({
      error: "Invalid contact id",
    });
  }
  const contactId = new ObjectId(req.params.id);
  try {
  //#swagger.tags=["Delete contact by id"]
    const response = await Contact.deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
      res.status(200).json({ message: "Contact deleted successfully" });
    } else {
      res.status(404).json({ error: "Contact not found" });
    }
  } catch (err) {
    console.error("Error deleting contact:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getOneById,
  getAll,
  createContact,
  updateContact,
  deleteContact,
};
