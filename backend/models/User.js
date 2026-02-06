const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['employee', 'manager', 'hr', 'admin'],
    default: 'employee'
  },
  department: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  vacationDays: {
    total: { type: Number, default: 20 },
    used: { type: Number, default: 0 },
    remaining: { type: Number, default: 20 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
