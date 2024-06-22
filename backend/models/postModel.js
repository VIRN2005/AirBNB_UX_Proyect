const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  texto: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);