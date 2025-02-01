const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');
 
router.post('/', async (req, res) => {
  try {
    const newAnnouncement = new Announcement(req.body);
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(400).json({ error: 'Error saving announcement!' });
  }
});
 
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching announcements!' });
  }
});

module.exports = router;
