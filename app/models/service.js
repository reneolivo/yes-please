var mongoose		= require('mongoose');
var Schema			= mongoose.Schema;

var theSchema = new Schema({
	name	: ''
});

//###### STATICS: ######//
var Statics			= require( './core/statics' );

theSchema.statics	= new Statics;
theSchema.statics.$publicFields = [ 'name' ];

//###### SET UP: ######//

module.exports = mongoose.model('Service', theSchema);
