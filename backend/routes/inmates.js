const express = require('express');
const router = express.Router();
const Inmate = require('../models/Inmate');
const AddDetails = require('../models/AddDetails');
router.post('/', async (req, res) => {
  try {
    const inmate = new Inmate(req.body);
    await inmate.save();
    res.status(201).json(inmate);
  } catch (error) {
    res.status(400).json({ error: 'Error saving inmate data!' });
  }
});
 
router.get('/filter', async (req, res) => {
  console.log('Request received to fetch inmates by quarter');
  try {
    const { quarterNumber } = req.query;
    console.log('Quarter Number:', quarterNumber);

    if (!quarterNumber) {
      return res.status(400).json({ message: 'Quarters Number is required!' });
    }

    const inmates = await Inmate.find({ quarterNumber }).lean();
    console.log('Inmates found:', inmates);

    if (!inmates.length) {
      return res.status(404).json([]);
    }

    res.status(200).json(inmates);
  } catch (error) {
    console.error('Error in filtering inmates:', error.message);
    res.status(500).json({ message: 'Server error!', details: error.message });
  }
});



router.get('/:mailId', async (req, res) => {
  try {
    const { mailId } = req.params;

    console.log(`Fetching details for mailId: ${mailId}`);  
    const userDetails = await AddDetails.findOne({ 'personDetails.email': mailId }).lean();

    if (!userDetails) {
      return res.status(404).json({ success: false, message: 'Mail ID not found!' });
    }

    const quarterNumber = userDetails.personDetails.quartersNumber;

    console.log(`Found quartersNumber: ${quarterNumber}`); 

    if (!quarterNumber) {
      return res.status(404).json({ success: false, message: 'No quarters assigned to this email!' });
    }
 
    const inmates = await Inmate.find({ quarterNumber }).lean();

    if (!inmates.length) {
      return res.status(404).json({ success: false, message: 'No inmates found for this quarters number!' });
    }

    console.log(`Returning ${inmates.length} inmate(s)`);  

    res.status(200).json(inmates);  
  } catch (error) {
    console.error('Error fetching inmates:', error.message);  
    res.status(500).json({ success: false, message: 'Server error!', details: error.message });
  }
});


module.exports = router;
