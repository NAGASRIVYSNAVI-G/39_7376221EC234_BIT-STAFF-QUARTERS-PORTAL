const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/AddDetails');
const Admin = require('../models/Admins');
const router = express.Router();
 
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;   
 
    let user = await User.findOne({ 'personDetails.email': email });

    if (!user) { 

      let admin = await Admin.findOne({ 'admins.adminID': email }); // adminID lookup

      if (!admin) {
        return res.status(404).json({ success: false, message: 'Email (or adminID) not found!' });
      }
 
      const isMatch = await bcrypt.compare(password, admin.admins.password);

      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid password!' });
      }
 
      return res.status(200).json({
        success: true,
        email: admin.admins.adminID,  
        isAdmin: true,
      });
    }
 
    const isMatch = await bcrypt.compare(password, user.personDetails.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid password!' });
    } 
    
    res.status(200).json({
      success: true,
      email: user.personDetails.email,
      isAdmin: false,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error!' });
  }
});

module.exports = router;
