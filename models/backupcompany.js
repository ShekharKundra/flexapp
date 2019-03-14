// Company Schema
module.exports = function(mongoose) {

	var backupcompany = mongoose.Schema({
		companyname: {
			type: String,
			},
		companycontact: {
			type: String,
			
			},
		companyemail: {
			type: String,
			
		},
		contactperson1: {
			type: String
		},
		phoneno1: {
			type: String,
			
        },
		email1: {
			type: String,
			
		},
		contactperson2: {
			type: String
		},
		phoneno2: {
			type: String,
			
		},
        email2: {
			type: String,
			
		},
		country: {
			type: String
		},
		state: {
			type: String
		},
		city: {
			type: String
		},
        address1: {
			type: String
		},
		address2: {
			type: String
		},
		pincode: {
			type: String
		},
	});

	return backupcompany;
};