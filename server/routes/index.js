const express = require('express');
const phonebook = require('../models/phonebook');

const router = express.Router();

// API for adding phonebooks

router.post('/add-phone', async (req, res) => {
  try {
    const newPhonebook = new phonebook(req.body);
    await newPhonebook.save();
    res.status(201).send(newPhonebook);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get('/get-phone', async (req, res) => {
    try {
      const phoneNumbers = await phonebook.find({});
      res.status(201).send(phoneNumbers);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });

router.patch('/update-phone/:id', async(req,res) => {
    try {
        const updatedPhonebook = await phonebook.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPhonebook) return res.status(404).send({ message: 'Phonebook not found.' });
        res.send(updatedPhonebook);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.delete('/delete-phone/:id', async (req, res) => {
    try {
        const deletedPhonebook = await phonebook.findByIdAndDelete(req.params.id);
        if (!deletedPhonebook) return res.status(404).send({ message: 'Phonebook not found.' });
        res.send(deletedPhonebook);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});


module.exports = router;