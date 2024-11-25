const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const classSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  teacher: {
    type: String,
    required: true,
    unique: true
  }
});


module.exports = mongoose.model('Class', classSchema);