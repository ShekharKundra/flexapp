// Srr Schema
module.exports = function(mongoose) {

	var srr = mongoose.Schema({
		itemName: {
			type: String
		},
		size: {
			type: String
		},
		drilling: {
			type: String
		},
		quantity: {
			type: Number
	}

});

	return srr;
};