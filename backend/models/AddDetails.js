const mongoose = require('mongoose');
const addDetailsSchema = new mongoose.Schema(
  {
    personDetails: {
      email: String,
      password: String,
      name: String,
      age: String,
      quartersNumber: String,
      department: String,
      quartersCheckInDate: String,
      dob: String,
      mobileNo: String,
      mailId: String,
      bloodGroup: String,
      aadharNumber: String,
      panNumber: String,
      permanentAddress: String,
      twoWheelerNumber: String,
      fourWheelerNumber: String,
      facultyId: String,
    },
    familyMembers: [
      {
        name: String,
        relation: String,
        age: String,
        bloodGroup: String,
        aadharNumber: String,
        working: String,
        employment: String,
      },
    ],
  },
  { timestamps: true }
);


module.exports =mongoose.model('AddDetail', addDetailsSchema);
