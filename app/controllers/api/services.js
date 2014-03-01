var service = require('../../models/service');

exports.index = function(req, res){
	service.$find( req.query ).exec().then(function(result) {
		res.json( result );
	});
};

exports.create = function(req, res) {
	var r = service.$create( req.body ).then(function(result) {
		res.json( result );
	});
}