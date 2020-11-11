const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
    // minlength: 100
  },
  height: {
    type: Number,
    required: true,
    unique: true,
    trim: true
    // minlength: 1
  },
  weight: {
    type: Number,
    required: true,
    unique: true,
    trim: true
    // minlength: 3
  },
  gpa: {
    type: Number,
    required: true,
    unique: true,
    trim: true
    // minlength: 3
  },
  award: {
    type: Number,
    required: true,
    unique: true,
    trim: true
    // minlength: 3
  },
  contact: {
    type: Number,
    required: true,
    unique: true,
    trim: true
    // minlength: 12
  },
  score: {
    type: String,
    required: false,
    unique: true,
    trim: true
    // minlength: 12
  },
  urlLink: {
    type: String,
    required: false,
    unique: true,
    trim: true
    // minlength: 12
  },
}, {
  timestamps: true, // It will give the information about when data is created or modified.
});

const User = mongoose.model('User', userSchema);

module.exports = User;