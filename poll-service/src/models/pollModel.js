const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  options: [
    {
      text: { type: String, required: true },
      votes: { type: Number, default: 0 },
    },
  ],
  creator: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
});

module.exports = mongoose.model('Poll', pollSchema);