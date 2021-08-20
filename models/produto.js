const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProdutoSchema = new Schema({
	nome: String,
	descricao: String,
	marca: String,
	categoria: String,
	preco: String,
	quantidade: String

});

module.exports = mongoose.model('Produto', ProdutoSchema);