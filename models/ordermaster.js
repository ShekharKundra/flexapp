// customer information  Schema
module.exports = function (mongoose) {

	var order = mongoose.Schema({
		companyid: {
			type: mongoose.Schema.Types.ObjectId,
            ref: "company"
		},
		ordernumber: {
			type: String
		},
		orderdate: {
			type: String
		},
		status: {
			type: String
		}
		,
		deliverydate: {
			type: String
		},
		orderstatus: {
			type: String
		}
	});

	return order;
};