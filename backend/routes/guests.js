const express = require('express');
const router = express.Router();
const Guest = require('../models/Guest');
const AddDetails = require('../models/AddDetails');
 
router.get('/filter', async (req, res) => {
  try {
    const { quartersNumber } = req.query;

    if (!quartersNumber) {
      return res.status(400).json({ success: false, message: 'Quarters Number is required!' });
    }
 
    const guests = await Guest.find({ quartersNumber }).lean();

    if (!guests.length) {
      return res.status(404).json({ success: false, message: 'No guest details found!' });
    }

    res.status(200).json({ success: true, guests });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error!', details: error.message });
  }
});
 
router.get('/:mailId', async (req, res) => {
  try {
    const { mailId } = req.params;
 
    const userDetails = await AddDetails.findOne({ 'personDetails.email': mailId }).lean();

    if (!userDetails) {
      return res.status(404).json({ success: false, message: 'Mail IDABC not found!' });
    }

    const quartersNumber = userDetails.personDetails.quartersNumber;
 
    const guests = await Guest.find({ quartersNumber }).lean();

    res.status(200).json({ success: true, guests });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error!', details: error.message });
  }
});
 
router.post('/', async (req, res) => {
  try {
    const newGuest = new Guest(req.body);
    await newGuest.save();
    res.status(201).json(newGuest);
  } catch (error) {
    res.status(400).json({ error: 'Error saving guest!' });
  }
});

module.exports = router;
