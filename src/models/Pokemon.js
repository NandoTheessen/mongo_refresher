const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const Pokemon = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  abilities: [{ type: ObjectId, ref: 'Ability' }]
});

module.exports = mongoose.model('Pokemon', Pokemon);
