// Srr Schema
module.exports = function(mongoose) {

	var rejhw = mongoose.Schema({
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

	return rejhw;
};