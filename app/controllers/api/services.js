var model			= require('../../models/service');
var APICrud			= require( './core/APICrud' );

var controller		= new APICrud( model );

exports.index		= function index( req, res ) {
	return controller.index( req, res );
}

exports.create = function create( req, res ) {
	return controller.create( req, res );
}