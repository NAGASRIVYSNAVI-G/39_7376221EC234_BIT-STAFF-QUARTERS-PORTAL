const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, required: true },
  adminID: { type: String, unique: true, required: true },
  password: { type: String, required: true }, 
});

module.exports = mongoose.model('Admins', AdminSchema);
