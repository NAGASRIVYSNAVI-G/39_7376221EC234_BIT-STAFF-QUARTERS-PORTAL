const express = require('express');
const bcrypt = require('bcryptjs');  
const router = express.Router();
const Admin = require('../models/Admins');  

 
router.get("/:adminID", async (req, res) => {
  try {
    const admin = await Admin.findOne({ adminID: req.params.adminID });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

 
router.post('/', async (req, res) => {
  try {
    const { name, age, role, adminID, password } = req.body;
 
    if (!name || !age || !role || !adminID || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
 
    const existingAdmin = await Admin.findOne({ adminID });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin ID already exists' });
    }
 
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt); 
 
    const newAdmin = new Admin({ name, age, role, adminID, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
