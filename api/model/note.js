const uuid = require('node-uuid');
const mongoose = require('mongoose');
require('mongoose-uuid2')(mongoose);


const NoteSchema = mongoose.Schema({
  _id: {
    type: mongoose.Types.UUID,
    default: uuid.v4,
  },
  title: {
    type: String,
    maxlength: [30, 'Max title length is 30'],
    required: [true, 'Title is required'],
  },
  text: {
    type: String,
    maxlength: [500, 'Max text length is 500'],
    default: '',
  },
}, {
  timestamps: {
    createdAt: 'date_create',
    updatedAt: 'date_update',
  },
});

NoteSchema.set('toObject', { getters: true });
// NoteSchema.set('toJSON', { getters: true });

module.exports = mongoose.model('Note', NoteSchema);
