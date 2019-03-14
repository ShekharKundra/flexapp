// rejda Schema
module.exports = function(mongoose) {

	var rejda = mongoose.Schema({
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

	return rejda;
};