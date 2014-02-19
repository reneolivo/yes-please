var mongoose		= require('mongoose');
var Schema			= mongoose.Schema;

var theSchema = new Schema({
	name	: ''
});

mongoose.model('Station', theSchema);
