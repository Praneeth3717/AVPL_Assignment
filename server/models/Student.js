const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  totalFee: Number,
  feePaid: Number,
  dueAmount: Number,
  dueDate: Date,
  feeStatus: {
    type: String,
    enum: ['pending', 'paid', 'not paid'],
    default: 'not paid'
  },
  confirmationStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'denied'],
    default: 'pending'
  },
});

module.exports = mongoose.model('Student', studentSchema);
