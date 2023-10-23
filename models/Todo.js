const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"], // Use an enum for predefined values
  },
  category: {
    type: String,
  },
  dateAdded: {
    type: Date,
  },
  description: {
    type: String,
  },
  });

module.exports = mongoose.model('Todo', TodoSchema);
