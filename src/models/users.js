const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  loginType: { type: Number, }
}, { timestamps: true });

module.exports = Users = mongoose.model('Userss', schema)