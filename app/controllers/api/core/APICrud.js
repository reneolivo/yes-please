var async		= require( 'async' );
var _			= require( 'lodash' );

function APICrud( model ) {
	this.model = model;
}

APICrud.prototype.index = function index( req, res ) {
	var query	= req.query;
	var filters	= [];

	var limit	= (_.isNumber( query.limit )) ? query.limit : 30;
	var skip	= (_.isNumber( query.skip )) ? query.skip : 0;

	if (limit > 100) limit = 100;
	
	var find	= this.model
					.$find( filters )
					.limit( limit )
					.skip( skip )
	;

	if (!_.isUndefined( query.sort )) {
		var sort = {};

		sort[ query.sort ] = (_.isNumber( query.order )) ? query.order : 1;

		find.sort( sort );
	}

	var count	= this.model.$find().count();

	return async.parallel({
		result: function( asyncCallback ) {
			return find.exec( asyncCallback );
		},
		count: function( asyncCallback ) {
			return count.exec( asyncCallback );
		}
	}, function(err, result) {
		if (err) return this.errorHandler( req, res, err );

		result.success = true;

		return res.json( result );
	}.bind( this ));
}

APICrud.prototype.errorHandler = function errorHandler( req, res, err) {
	var jsonResponse = {
		success	: false,
		result	: null,
		message	: err.getMessage(),
		error	: err
	};

	return res.json( 500, jsonResponse );
}

APICrud.prototype.create = function create( req, res ) {
	this.model.$create( req.body ).then(function(result) {
		var jsonResponse = {
			success	: true,
			result	: result
		};

		return res.json( jsonResponse );
	}, this.errorHandler );
}


module.exports = APICrud;