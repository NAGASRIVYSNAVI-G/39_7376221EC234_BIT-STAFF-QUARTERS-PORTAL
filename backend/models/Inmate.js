const mongoose = require('mongoose');

const inmateSchema = new mongoose.Schema(
  {
    quarterNumber: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inmate', inmateSchema);
