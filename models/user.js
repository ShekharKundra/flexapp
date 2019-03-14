// User Schema
module.exports = function(mongoose) {

	var User = mongoose.Schema({
		username: {
			type: String,
			unique: true,
			index: true
		},
		email: {
			type: String,
			unique: true
		},
		password: {
			type: String
		},
		firstname: {
			type: String
		},
		lastname: {
			type: String
		},
		phoneno: {
			type: String,
			default: 0
		},
		gender: {
			type: String
		},
		validphoneno: {
			type: Boolean,
			default: false
		},
		address: {
			type: String
		},
		state: {
			type: String
		},
		city: {
			city: String
		},
		pin: {
			type: String
		},
		validemail: {
			type: Boolean
		},
		creationdata: {
			type: Date,
			default: Date.now
		},
		lastlogin: {
			type: Date,
			default: Date.now
		},
		salt: {
			type: String
		},
		twofactoerauth: {
			type: Boolean,
			default: false
		},
		status: {
			type: Boolean,
			default: true
		}
	});

	return User;
};