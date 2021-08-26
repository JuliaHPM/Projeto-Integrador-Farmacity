const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VendaSchema = new Schema({
	cliente: String,
	/*produtos:[
		{
			type: Schema.Types.ObjectId,
			ref:'Produto'
		}],
	quantidade:	[
		{
			type: Schema.Types.ObjectId,
			ref:'Produto'
		}],*/
	totalVenda: { type: String },
	dataVenda: { type: String }
});

module.exports = mongoose.model('Venda', VendaSchema);