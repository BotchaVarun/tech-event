const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  eventType: String,
});

module.exports = mongoose.model('Registration', registrationSchema);
