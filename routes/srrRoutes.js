var router = require('express').Router({
    mergeParams: true
});

module.exports = function (bodyParser, srrmodel, backupsrrmodel, stockcalcmodel) {

    router.use(bodyParser.json());

    router.use(bodyParser.urlencoded({
        extended: true
    }));

    //to view page to add new stock
    router.get("/addstock", function (req, res) {
        res.status(200).render("./srrstock/addstock");

    });

    //to save new added stock
    router.post("/addsrrstock", function (req, res) {
        var adddata = srrmodel({
            itemName: req.body.arch,
            size: req.body.size,
            drilling: req.body.drilling,
            quantity: req.body.quantity
        });
        console.log(adddata);
        srrmodel.findOne({
            itemName: req.body.arch,
            size: req.body.size,
            drilling: req.body.drilling,
        }, function (err, data) {


            if (data == null) {
                adddata.save()
                    .then(function () {
                        var backupdata = backupsrrmodel({
                            itemName: req.body.arch,
                            size: req.body.size,
                            drilling: req.body.drilling,
                            quantity: req.body.quantity,
                            reason: 'save'
                        });
                        backupdata.save();
                        console.log("new srr stock saved ");
                        console.log(data);
                        req.flash("suc", "New Item stock added");
                        res.status(200).redirect("./addstock");
                    })
                    .catch(function (err) {
                        console.log("error while adding srr stock " + err);
                        if (err) {
                            console.log("srr stock saved saved");
                        }
                    });
            } else {
                console.log(' this is data find' + data);
                var backupdata = backupsrrmodel({
                    itemName: req.body.arch,
                    size: req.body.size,
                    drilling: req.body.drilling,
                    quantity: req.body.quantity,
                    reason: 'update'
                });
                backupdata.save();
                var dataid = data.id;
                console.log(' this is qty' + data.quantity);
                var newstock = parseInt(data.quantity) + parseInt(req.body.quantity);

                srrmodel.findOneAndUpdate({
                    _id: dataid
                }, {
                    quantity: newstock
                }, function (err, updateddata) {
                    console.log("new updated stock" + updateddata);
                });
                req.flash("error", "Item already exists, stock updated");
                res.status(200).redirect("./addstock");
            }

        });

    });

    //to display current stock
    router.get("/viewstock", function (req, res) {
        srrmodel.find({}, function (err, data) {
            console.log("hi.............");
            res.status(200).render("./srrstock/viewstock", {
                data: data
            });
        });
    });

    //to delete from current stock
    router.post('/delet/:id', function (req, res) {
        console.log("Deleting");
        srrmodel.findById(req.params.id, function (err, post) {
            var backupdata = backupsrrmodel({
                itemName: post.itemName,
                size: post.size,
                drilling: post.drilling,
                quantity: post.quantity,
                reason: 'delete'
            });
            backupdata.save();
            post.remove(function (err, post) {
                res.redirect("../viewstock");
            });
        });
    });

    //to modify from current stock
    router.post('/modifi/:id', function (req, res) {
        srrmodel.findById(req.params.id, function (err, post) {
            res.status(200).render("./srrstock/updatestock", {
                data: post
            });

        });
    });

    //to update quantities for modifying stock
    router.post('/updatesrrstock/:id', function (req, res) {
        console.log("Modify");
        srrmodel.findOneAndUpdate({
            _id: req.params.id
        }, {
            quantity: req.body.quantity
        }, function (err, updateddata) {
            console.log("new updated stock" + updateddata);
            res.redirect("../viewstock");
        });
    });

    //to search stock quantity
    router.post('/findstock', function (req, res) {
        var query = {};
        if (req.body.arch != "") {
            query.itemName = req.body.arch;
        }
        if (req.body.size != "") {
            query.size = req.body.size;
        }
        if (req.body.drilling != "") {
            query.drilling = req.body.drilling;
        }
        console.log(query);
        srrmodel.find(query, function (err, data) {
            console.log("hi.............");
            console.log(data);
            res.status(200).render("./srrstock/viewstock", {
                data: data
            });
        });
    });

    //to display page - add bill of quantities
    router.get("/addboq", function (req, res) {
        res.status(200).render("./srrstock/addboq");
    });

    //to add and save boq
    router.post('/addnewboq', function (req, res) {
        stockcalculator = stockcalcmodel({
            itemname: req.body.arch,
            itemsize: req.body.size,
            itemprating: req.body.prating,
            itemdrilling: req.body.drilling,
            srrsize: req.body.size,
            srrdrilling: req.body.drilling,
            srrquantity: req.body.srrqty,
            cusize: req.body.size,
            cudrilling: req.body.drilling,
            cuquantity: req.body.cuqty,
            trsize: req.body.rodsize,
            trquantity: req.body.trqty
        });
        console.log(stockcalculator);
        stockcalculator.save();
        res.status(200).render("./srrstock/addboq");
    });

    //to view all boq
    router.get("/viewboq", function (req, res) {
        stockcalcmodel.find({}, function (err, data) {
            //console.log(data);
            res.status(200).render("./srrstock/viewboq", {
                data: data
            });
        });
    });

    //to edit existing boq
    router.post('/edit/:id', function (req, res) {
        stockcalcmodel.findOne({
            _id: req.params.id
        }, function (err, data) {
            res.status(200).render("./srrstock/updateboq", {
                data: data
            });
        });
    });

    //to save updated boq and redirect to all boq page
    router.post('/updated/:id', function (req, res) {
        stockcalcmodel.findOneAndUpdate({
            _id: req.params.id
        }, {
            itemname: req.body.arch,
            itemsize: req.body.size,
            itemprating: req.body.prating,
            itemdrilling: req.body.drilling,
            srrsize: req.body.size,
            srrdrilling: req.body.drilling,
            srrquantity: req.body.srrqty,
            cusize: req.body.size,
            cudrilling: req.body.drilling,
            cuquantity: req.body.cuqty,
            trsize: req.body.rodsize,
            trquantity: req.body.trqty
        }, function (err, updatedboq) {
            console.log(updatedboq);
            res.status(200).redirect("../viewboq");
        });
    });

    //to find boq
    router.post('/findboq', function (req, res) {
        var query = {};

        if (req.body.arch != "") {
            query.itemname = req.body.arch;
            if (req.body.arch === undefined) {
                delete query.itemname;
            }
        }
        if (req.body.size != "") {
            query.itemsize = req.body.size;
            if (req.body.size === undefined) {
                delete query.itemsize;
            }
        }
        if (req.body.drilling != "") {
            query.itemdrilling = req.body.drilling;
            if (req.body.drilling === undefined) {
                delete query.itemdrilling;
            }
        }
        if (req.body.prating != "") {
            query.itemprating = req.body.prating;
            if (req.body.prating === undefined) {
                delete query.itemprating;
            }
        }
        console.log(query);
        stockcalcmodel.find(query, function (err, data) {
            console.log("boq found");
            //console.log(data);
            res.status(200).render("./srrstock/viewboq", {
                data: data
            });
        });
    });


    return router;
};