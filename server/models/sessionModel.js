// models/Session.js

const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  json_file_url: {
    type: String
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  }
}, { timestamps: true }); // createdAt, updatedAt auto-added

module.exports = mongoose.model('Session', sessionSchema);
