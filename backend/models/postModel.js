const mongoose = require ('mongoose');

const postSchema = new mongoose.Schema({
    owner: { type: String, required: true },
    nombre: { type: String, required: true },
    categoria: { type: String, required: true },
    ubicacion: { type: String, required: true },
    Precio: { type: Number, required: true },
    Horario: { type: String, required: true },
    Rating: { type: Number, required: true },
    cantidadPersonas: {type: Number, require: true},
    fechaEntrada: {type: String, require: true},
    fechaSalida: {type: String, require: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  }, { timestamps: true });

  module.exports = mongoose.model('Post', postSchema);