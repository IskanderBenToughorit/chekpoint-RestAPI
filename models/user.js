// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'] // Contrainte de validation
  },
  email: {
    type: String,
    required: [true, 'Email is required'] // Contrainte de validation
  },
  age: {
    type: Number,
    required: false // Age n'est pas nécessaire, mais facultatif
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
