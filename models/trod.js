// tie rod Schema
module.exports = function(mongoose) {

	var trod = mongoose.Schema({
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
			type: String
		}
	});

	return trod;
};