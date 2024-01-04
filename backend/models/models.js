const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  description: String,
  duration_min: Number,
  time_spent_min: Number,
  category: {
    type: String,
    enum: ['learning', 'work', 'recreation', 'social', 'errand', 'fitness']
  },
  status: {
    type: String,
    enum: ['todo', 'complete', 'in progress']
  }
});

module.exports.Task = mongoose.model('Task', taskSchema);