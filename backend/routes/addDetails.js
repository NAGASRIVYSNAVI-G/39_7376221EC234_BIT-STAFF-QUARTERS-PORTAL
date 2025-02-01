const express = require('express');
const router = express.Router();
const Details = require('../models/AddDetails');
 
const bcrypt = require('bcryptjs'); 

router.post('/', async (req, res) => {
  try {
    const { personDetails, familyMembers } = req.body;
 
    const hashedPassword = await bcrypt.hash(personDetails.password, 10);
 
    const newPersonDetails = { ...personDetails, password: hashedPassword };
 
    const newDetails = new Details({
      personDetails: newPersonDetails,
      familyMembers,
    });
 
    await newDetails.save();
    res.status(201).json({ success: true, message: 'Details added successfully!', data: newDetails });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Error saving details!', details: error.message });
  }
}); 

module.exports = router;
