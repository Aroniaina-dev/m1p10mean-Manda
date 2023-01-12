const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    immatriculation: { type: String, required: true, },
    marque: { type: String, required: true, },
    modele: { type: String },
    materiel: [{
        designationMateriel: {type: String, required: true},
        prixReparation: { type: Number, required: true},
        dateFinReparation: {type: Date}
    }],
    dateEntrerGarage: { type: Date, required: true},
    dateSortieGarage: { type: Date}
}, { timestamps: true });

module.exports = Voiture = mongoose.model('Voiture', schema)