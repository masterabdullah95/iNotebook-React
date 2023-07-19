const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true
  }, 
  body: {
    type: String,
    required: true
  },
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;