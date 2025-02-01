const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    views: { type: Number, default: 0 },
    isModified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Announcement', announcementSchema);
