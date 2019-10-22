const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema = Schema({
	name:{type: String},
	last:{type: String},
	user:{type: String},
	email:{type: String},
	password:{type: String}
});

module.exports = mongoose.model('users',userSchema);
