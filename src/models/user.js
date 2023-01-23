const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    nom: { type: String, required: true, },
    prenom: { type: String, required: true, },
    email: { type: String, required: true, },
    password: { type: String, required: true, },
    phone: { type: String, },
    loginType: { type: Number, },
    voiture: [{
        immatriculation: { type: String, required: true, },
        marque: { type: String, required: true, },
        modele: { type: String },
        materiel: [{
            designationMateriel: {type: String, required: true},
            prixReparation: { type: Number, required: true},
            dateFinReparation: {type: Date},
            estReparer: {type: Boolean}
        }],
        estDansLeGarage: {type: Boolean},
        dateEntrerGarage: { type: Date},
        dateSortieGarage: { type: Date},
        estTerminer: {type:Boolean},
        payer: {type: Boolean},
        estPayer: {type: Boolean}
    }],
}, { timestamps: true });

module.exports = User = mongoose.model('Users', schema)