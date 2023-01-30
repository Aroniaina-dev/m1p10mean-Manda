const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      
      },
    immatriculation: { type: String, required: true, },
    marque: { type: String, required: true, },
    type: { type: String },
    year: { type: Number },
    etat: { type: Boolean },
    reparation: [{
        desigantion: {type: String, required: true},
        type: { type: String },
        nombre: { type: Number, required: true},
        prix: { type: Number, required: true},
        prixPiece: { type: Number },
        etat: { type: Boolean },
        dateDebutReparation: {type: Date},
        dateFinReparation: {type: Date}
    }],
}, { timestamps: true });

module.exports = VoitureTemp = mongoose.model('VoitureTemp', schema)