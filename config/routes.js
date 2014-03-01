module.exports = function( app ){

	//home route
	var home = require( '../app/controllers/home' );
	app.get( '/', home.index );

	//API:
	var api = require( '../app/controllers/api/api' );
	app.get( '/api/services', api.services.index );
	app.post( '/api/services', api.services.create );
};
