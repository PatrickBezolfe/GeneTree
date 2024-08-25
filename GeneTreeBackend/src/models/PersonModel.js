const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name: {type: String,required: true},
    gender: {type: String, enum:['Male', 'Female'], required: true},
    id: { type: Number, unique: true, required: true },
    partnerId: { type: Number, default: null},
    fatherId: { type: Number, default: null},
    motherId: { type: Number, default: null}
});

const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;