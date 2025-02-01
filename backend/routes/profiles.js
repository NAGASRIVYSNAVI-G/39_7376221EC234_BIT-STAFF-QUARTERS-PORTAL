const express = require('express');
const router = express.Router();
const Profile = require('../models/AddDetails'); 
const AddDetails = require('../models/AddDetails'); 
router.get('/email/:email', async (req, res) => {
  try {
    const { email } = req.params;
 
    const userDetails = await AddDetails.findOne({ 'personDetails.email': email });

    if (!userDetails) {
      return res.status(404).json({ success: false, message: 'User not found in AddDetails!' });
    }
 
    const profile = await Profile.findOne({ 'personDetails.email': email });

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found in Profile collection!' });
    }

    res.status(200).json({ success: true, data: profile });

  } catch (error) {
    console.error("Error fetching profile by email:", error);
    res.status(500).json({ success: false, message: 'Server error!' });
  }
});
 
router.get('/:facultyId', async (req, res) => {
  try {
    const { facultyId } = req.params;
    const user = await Profile.findOne({ 'personDetails.facultyId': facultyId });

    if (user) {
      res.status(200).json({ success: true, data: user });
    } else {
      res.status(404).json({ success: false, message: 'Profile not found!' });
    }
  } catch (error) {
    console.error("Error fetching profile by facultyId:", error);
    res.status(500).json({ success: false, message: 'Server error!' });
  }
});
 
router.put('/:facultyId', async (req, res) => {
  try {
    const { facultyId } = req.params;
    const updatedData = req.body.personDetails;

    if (!updatedData) {
      return res.status(400).json({ success: false, message: 'Invalid update data!' });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { 'personDetails.facultyId': facultyId },
      { $set: { personDetails: updatedData } },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ success: false, message: 'Profile not found!' });
    }

    res.status(200).json({ success: true, message: 'Profile updated successfully!', data: updatedProfile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: 'Server error!' });
  }
});
 
router.delete('/:facultyId', async (req, res) => {
  try {
    const { facultyId } = req.params;

    const deletedProfile = await Profile.findOneAndDelete({ 'personDetails.facultyId': facultyId });

    if (!deletedProfile) {
      return res.status(404).json({ success: false, message: 'Profile not found!' });
    }

    res.status(200).json({ success: true, message: 'Profile deleted successfully!' });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ success: false, message: 'Server error!' });
  }
});


module.exports = router;
