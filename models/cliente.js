const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
	nome: String,
	email: String,
	data_nasc: String,
	telefone: String,
	cpf: String,
	rg: String
});

module.exports = mongoose.model('Cliente', ClienteSchema);