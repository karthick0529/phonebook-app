const mongoose = require('mongoose');

// phonebookschema

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  phone: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 15,
    unique: true,
  },
});

// Phonebook model

const Phonebook = mongoose.model('Phonebook', phonebookSchema);

module.exports = Phonebook;