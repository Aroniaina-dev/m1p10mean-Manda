const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    designationGlobal: { type: String, required: true, },
    materiel:[{
        designationMateriel: {type: String, required: true,},
        prixReparation: { type: Number, required: true, }
    }]
    
}, { timestamps: true });

module.exports = Materiel = mongoose.model('Materiel', schema)