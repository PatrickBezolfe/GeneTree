const Person = require('../models/PersonModel');

const readPerson = async (req, res) => {
  try {
    const personList = await Person.find();
    res.status(200).json(personList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPerson = async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.status(201).json(person);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePerson = async (req, res) => {
  try {
    // Convert ID to Number
    const personId = parseInt(req.params.id, 10);
    const person = await Person.findOneAndUpdate({ id: personId }, req.body, { new: true });
    if (!person) {
      return res.status(404).json({ message: 'Pessoa não encontrada' });
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePerson = async (req, res) => {
  try {
    // Convert ID to Number
    const personId = parseInt(req.params.id, 10);
    const person = await Person.findOneAndDelete({ id: personId });
    if (!person) {
      return res.status(404).json({ message: 'Pessoa não encontrada' });
    }
    res.status(200).json({ message: 'Excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  readPerson,
  createPerson,
  updatePerson,
  deletePerson
};