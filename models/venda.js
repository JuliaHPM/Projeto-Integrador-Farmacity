const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProdutoSchema = new Schema({
	cliente: String,
	produtos:[
		{
			type: Schema.Types.ObjectId,
			ref:'Produto'
		}],
	quantidade:	[
		{
			type: Schema.Types.ObjectId,
			ref:'Produto'
		}],
	valor_total: { type: "numberDecimal" },
	data_venda: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Produto', ProdutoSchema);