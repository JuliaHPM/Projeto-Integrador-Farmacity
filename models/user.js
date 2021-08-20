const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
	//username: String,
	//password: String
	email: String,
	/*notes:[
		{
			type: Schema.Types.ObjectId,
			ref:'Note'
		}]*/
		
});

UserSchema.plugin(passportLocalMongoose); //faz a autenticação e controle de login

module.exports = mongoose.model('User', UserSchema);