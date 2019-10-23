const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = Schema({
	title:{type: String},
	note:{type: String},
	status:{
		type:Boolean,
		default:false
	}
});

module.exports = mongoose.model('notes',noteSchema);
