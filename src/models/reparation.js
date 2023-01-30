const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    desigantion: { type: String, required: true, },
    type: { type: String },
    nombre: { type: Number },
    prix: { type: Number },
    etat: { type: Boolean },
    dateDebutReparation: { type: Date, required: true},
    dateFinReparation: { type: Date}
}, { timestamps: true });

module.exports = Reparation = mongoose.model('Reparation', schema)