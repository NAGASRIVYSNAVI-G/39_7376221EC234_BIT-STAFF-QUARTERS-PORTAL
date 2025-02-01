const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const AddDetails = require('../models/AddDetails');

router.post('/', async (req, res) => {
  try {
    const newComplaint = new Complaint(req.body);
    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (error) {
    res.status(400).json({ error: 'Error saving complaints!' });
  }
});

 
router.get('/:mailId', async (req, res) => {
  try {
    const { mailId } = req.params;
 
    const userDetails = await AddDetails.findOne({ 'personDetails.email': mailId }).lean();


    if (!userDetails) {
      return res.status(404).json({ success: false, message: 'Mail ID not found!' });
    }

    const quartersNumber = userDetails.personDetails.quartersNumber;
 
    const complaints = await Complaint.find({ quartersNumber }).lean();

    res.status(200).json({ success: true, complaints });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error!', details: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching complaints!' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (updatedComplaint) {
      res.status(200).json(updatedComplaint);
    } else {
      res.status(404).json({ error: 'Complaint not found!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating complaint status!' });
  }
});

module.exports = router;
