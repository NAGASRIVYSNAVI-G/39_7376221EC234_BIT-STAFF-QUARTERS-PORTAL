const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema(
  {
    quartersNumber: { type: String, required: true },
    numGuests: { type: Number, required: true },
    fromPlace: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Guest', guestSchema);
