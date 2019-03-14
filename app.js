var express = require('express');
var https = require('https');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');
var title = require('express-title');

//creating application
var app = express();

// calling all config files
var config = require("./config");
var httpsOptions = require("./config/https.js");

//assigning port no
var port = process.env.PORT || 1094;

// declaring middleware
//create session for app
app.use(session({
	cookie: {
		maxage: 20000
	},
	secret: 'abcd123',
	resave: false,
	saveUninitialized: false
}));

// Adding flash for messaging 
app.use(flash());

// Adding title to each Page
app.use(title());

//adding some local variables for message
app.use('/', function (req, res, next) {
	//console.log('Request Url:' + req.url);
	res.locals.title = req.flash("title");
	res.locals.error = req.flash("error");
	res.locals.suc = req.flash("suc");
	res.locals.sale = req.flash("sale");
	res.locals.company = req.flash("company");
	next();
});

//for public folder to acessable all over the app
app.use('/assets', express.static(__dirname + '/public'));

// we are using ejs for front end
app.set('view engine', 'ejs');
app.set('title', 'This EasyFlex CMS System');

//createing connection with easyflexdb
mongoose.Promise = global.Promise;
var easyflexdb = mongoose.connect(config.getDbConnectionString(), {
	useCreateIndex: true,
	useNewUrlParser: true
});

//creating schema with easyflexdb from respective model
var srrmodel = mongoose.model("srr", require("./models/srr")(mongoose));
var backupsrrmodel = mongoose.model("backupsrr", require("./models/backupsrr")(mongoose));
var companymodel = mongoose.model("company", require("./models/company")(mongoose));
var backupcompanymodel = mongoose.model("backupcompany", require("./models/backupcompany")(mongoose));
var ordermodel = mongoose.model("order", require("./models/ordermaster")(mongoose));
var orderselectmodel = mongoose.model("orderselect", require("./models/orderselect")(mongoose));
var backupordermodel = mongoose.model("backuporder", require("./models/backuporder")(mongoose));
var stockcalcmodel = mongoose.model("stockcalc", require("./models/stockcalc")(mongoose));

//routes
app.use("/orders", require("./routes/orderRoutes")(bodyParser, ordermodel, orderselectmodel, backupordermodel, companymodel));
app.use("/srrstock", require("./routes/srrRoutes")(bodyParser, srrmodel, backupsrrmodel, stockcalcmodel));
app.use("/company", require("./routes/companyRoutes")(bodyParser, companymodel, backupcompanymodel, ordermodel));
app.use("/requirements", require("./routes/reqRoutes")(bodyParser, orderselectmodel, ordermodel, stockcalcmodel));
app.use("/", require("./routes/mainpageroutes")(bodyParser, ordermodel, srrmodel));

//implementing https server
https.createServer(httpsOptions, app).listen(port, function () {
	console.log("easyflex bellow ms", port);
});