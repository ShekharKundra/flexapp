// backup order information  Schema
module.exports = function(mongoose) {

	var backuporder = mongoose.Schema({
		customername: {
			type: String
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
		orderstatus:{
			type: String
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

	return backuporder;
};