const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  pincode: {
    type: String,
    required: true,
    match: [/^[0-9]{6}$/, 'Please enter a valid pincode']
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 120
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Registration', registrationSchema); 