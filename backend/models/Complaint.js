const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
  {
    quartersNumber: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    availabilityTime: { type: String, required: true },
    complaintType: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'Registered' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Complaint', complaintSchema);
