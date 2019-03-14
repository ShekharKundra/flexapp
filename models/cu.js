// control unit Schema
module.exports = function(mongoose) {

	var cu = mongoose.Schema({
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

	return cu;
};