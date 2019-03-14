var router = require('express').Router({
    mergeParams: true
});

module.exports = function (bodyParser, companymodel, backupcompanymodel, ordermodel) {
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({
        extended: true
    }));

    //get route for adding new company
    router.get("/new", function (req, res) {
        res.status(200).render("./company/new");
    });

    //post to aad new company
    router.post('/addnewcompany', function (req, res) {
        var newcompany = companymodel({
            companyname: req.body.cname,
            companycontact: req.body.cnum,
            companyemail: req.body.cemail,
            contactperson1: req.body.cp1name,
            phoneno1: req.body.cp1num,
            email1: req.body.cp1email,
            department1: req.body.dep1,
            contactperson2: req.body.cp2name,
            phoneno2: req.body.cp2num,
            email2: req.body.cp2email,
            department2: req.body.dep2,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            address1: req.body.sname,
            address2: req.body.bname,
            pincode: req.body.pcode,
        });
        console.log(newcompany);
        newcompany.save();
        req.flash("company", "New Company added and saved");
        res.status(200).redirect("../company/new");
    });

    //get route for displaying all companies
    router.get("/all", function (req, res) {
        companymodel.find({}, function (err, data) {
            res.status(200).render("./company/all", {
                data: data
            });
        });
    });

    //to delete the company
    router.post("/delete/:id", function (req, res) {
        // console.log("deleted entry");
        companymodel.findById(req.params.id, function (err, post) {
            var backupcompanydata = backupcompanymodel({
                companyname: req.body.cname,
                companycontact: req.body.cnum,
                companyemail: req.body.cemail,
                contactperson1: req.body.cp1name,
                phoneno1: req.body.cp1num,
                email1: req.body.cp1email,
                contactperson2: req.body.cp2name,
                phoneno2: req.body.cp2num,
                email2: req.body.cp2email,
                country: req.body.country,
                state: req.body.state,
                city: req.body.city,
                address1: req.body.sname,
                address2: req.body.bname,
                pincode: req.body.pcode,
                reason: 'deleted'
            });
            backupcompanydata.save();
            post.remove(function (err, data) {
                req.flash("suc", "company deleted");
                res.redirect("../all");
            });
        });
    });

    //show the data to update company
    router.post("/update/:id", function (req, res) {
        companymodel.findOne({
            _id: req.params.id
        }, function (err, data) {
            res.status(200).render("./company/update", {
                data: data
            });
        });
    });

    //to update company
    router.post("/updated/:id", function (req, res) {
        companymodel.findOneAndUpdate({
            _id: req.params.id
        }, {
            companyname: req.body.cname,
            companycontact: req.body.cnum,
            companyemail: req.body.cemail,
            contactperson1: req.body.cp1name,
            phoneno1: req.body.cp1num,
            email1: req.body.cp1email,
            contactperson2: req.body.cp2name,
            phoneno2: req.body.cp2num,
            email2: req.body.cp2email,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            address1: req.body.sname,
            address2: req.body.bname,
            pincode: req.body.pcode,
        }, function (err, updateddata) {
            console.log(updateddata);
            req.flash("company", "Company Details Updated");
            res.status(200).redirect("../all");
        });
    });

    //to search a company
    router.post('/findcompany', function (req, res) {
        var query = {};
        if (req.body.cname != "") {
            query.companyname = req.body.cname;
        }
        if (req.body.state != "") {
            query.state = req.body.state;
        }
        if (req.body.city != "") {
            query.city = req.body.city;
        }
        console.log(query);
        companymodel.find(query, function (err, data) {
            console.log("company found");
            console.log(data);
            res.status(200).render("./company/all", {
                data: data
            });
        });
    });

    //to view all company orders
    router.post("/companyorders/:id", function (req, res) {
        var query = {
            companyid: req.params.id
        };
        if (req.body.onum != "") {
            query.ordernumber = req.body.onum;
        }
        if (req.body.onum === undefined) {
            delete query.ordernumber;
        }
        if (req.body.odate != "") {
            query.orderdate = req.body.odate;
        }
        if (req.body.odate === undefined) {
            delete query.orderdate;
        }
        if (req.body.jobstatus != "") {
            query.orderstatus = req.body.jobstatus;
        }
        if (req.body.jobstatus === undefined) {
            delete query.orderstatus;
        }
        console.log(query);
        companymodel.findById(req.params.id, function (err, companydata) {
            ordermodel.find(query, function (err, ordermasterdata) {
                //console.log(ordermasterdata);
                res.status(200).render("./company/companyorders", {
                    companydata: companydata,
                    ordermasterdata: ordermasterdata
                });
            });
        });
    });

    return router;
};