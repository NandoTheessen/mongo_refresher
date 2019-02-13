const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const Ability = mongoose.Schema({
  id: { type: ObjectId },
  name: { type: String, required: true },
  is_hidden: { type: Boolean, default: false },
  url: { type: String, required: true },
  slot: { type: Number, required: true }
});

module.exports = mongoose.model('Ability', Ability);
