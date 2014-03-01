function Statics() {

}

Statics.prototype.$find = function $find(filters) {
	return this.find( filters );
}

Statics.prototype.$isObjectId = function $isObjectId(id) {
	var regexp = new RegExp("^[0-9a-fA-F]{24}$");

	return regexp.test( id );
}

Statics.prototype.$cleanObject = function $cleanObject(object) {
	var publicFields = this.$publicFields;

	if ( !Array.isArray( publicFields )) throw new Error( 'Public Fields not defined correctly' );

	var data = {};
	for(var i in publicFields) {
		var field = publicFields[ i ];

		if (typeof object[ field ] !== 'undefined') {
			data[ field ] = object[ field ];
		}
	}

	return data;
}

Statics.prototype.$create = function $create(object) {
	var data 		= this.$cleanObject( object );

	return this.create( data );
}

Statics.prototype.$update = function $update(object) {
	var self		= this;

	return self.findOne({ _id : object._id }).then(function(result) {
		if (result === null) throw new Error( 'document not found' );

		var data 	= self.$cleanObject( object );
		
		delete data._id;

		return self.update( { _id: object._id }, data );
	});
}

Statics.prototype.$delete = function $delete(ObjectId) {
	var self		= this;

	return self.findOne({ _id : ObjectId }, function(err, result) {
		if (result === null) throw new Error( 'document not found' );

		return result.remove();
	});
}

module.exports = Statics;