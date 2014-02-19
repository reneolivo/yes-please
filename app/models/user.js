var mongoose		= require('mongoose');
var Schema			= mongoose.Schema;

var theSchema = new Schema({
	firstName	: '',
	lastName	: ''
});

mongoose.model('User', theSchema);