// order select Schema
module.exports = function(mongoose) {

	var orderselect = mongoose.Schema({
		orderid: {
			type: mongoose.Schema.Types.ObjectId,
            ref: "order"
		},
		orderarch: {
			type: String
		},
		ordersize: {
			type: String
		},
		orderdrilling: {
			type: String
		},
		orderprating: {
			type: String
        },
        ordercontrolunit: {
			type: String
		},
		orderquantity: {
			type: Number
		}
	});

	return orderselect;
};