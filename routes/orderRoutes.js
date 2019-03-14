var router = require('express').Router({
    mergeParams: true
});

module.exports = function (bodyParser, ordermodel, orderselectmodel, backupordermodel, companymodel) {

    router.use(bodyParser.json());

    router.use(bodyParser.urlencoded({
        extended: true
    }));


    //to view new sale order page
    router.post("/sorder/:id", function (req, res) {
        companymodel.findById(req.params.id, function (err, data) {
            console.log(data);
            res.status(200).render("./orders/sorder", {
                data: data
            });
        });
    });

    //to save new sale order
    router.post("/addsorder", function (req, res) {
        var adddata = ordermodel({
            companyid: req.body.companyid,
            ordernumber: req.body.onum,
            orderdate: req.body.odate,
            status: req.body.status,
            deliverydate: req.body.ddate,
            orderstatus: req.body.jobstatus,

        });
        //console.log(adddata);
        adddata.save()
            .then(function (data) {
                req.flash("sale", "New Sale Order added and saved");
                // console.log(data);
                res.status(200).redirect("./productselect/" + data.id);
            }).catch(function (err) {
                //console.log("error while adding order " + err);
                if (err) {
                    //  console.log("new order saved");
                }
            });
    });

    router.post("/orderdetails/:id", function (req, res) {

        var orderdetails = orderselectmodel({
            orderid: req.params.id,
            orderarch: req.body.arch,
            ordersize: req.body.size,
            orderdrilling: req.body.drilling,
            orderprating: req.body.prating,
            ordercontrolunit: req.body.controlunit,
            orderquantity: req.body.quantity
        });
        console.log(orderdetails);
        orderdetails.save().
            then(function (orderdetailsdata) {

                ordermodel.findById(req.params.id).populate("company").exec(function (err, ordermasterdata) {

                    if (err) {
                        console.log("error ");
                    } else {
                        companymodel.findById(ordermasterdata.companyid, function (err, companydata) {

                            orderselectmodel.find({
                                orderid: req.params.id
                            }, function (err, orderdetaildata) {
                                res.redirect('/orders/productselect/' + req.params.id);
                            });
                        });
                    }
                });
            }).catch(function (err) {
                console.log("hi " + err);

            });
    });

    router.post("/neworder/:id", function (req, res) {
        console.log("hi");
        // res.redirect('/orders/neworder/' + req.params.id);
        ordermodel.findById(req.params.id).populate("company").exec(function (err, ordermasterdata) {
            if (err) {
                console.log(err);
            } else {
                companymodel.findById(ordermasterdata.companyid, function (err, companydata) {
                    orderselectmodel.find({
                        orderid: req.params.id
                    }, function (err, orderdetaildata) {

                        res.status(200).render("./orders/neworder", {
                            companydata: companydata,
                            ordermasterdata: ordermasterdata,
                            orderdetaildata: orderdetaildata
                        });
                    });
                });
            }
        });

    });


    router.get("/productselect/:id", function (req, res) {
        ordermodel.findById(req.params.id).populate("company").exec(function (err, ordermasterdata) {
            if (err) {
                console.log(err);
            } else {
                companymodel.findById(ordermasterdata.companyid, function (err, companydata) {
                    orderselectmodel.find({
                        orderid: req.params.id
                    }, function (err, orderdetaildata) {
                        res.status(200).render("./orders/productselect", {
                            companydata: companydata,
                            ordermasterdata: ordermasterdata,
                            orderdetaildata: orderdetaildata
                        });
                    });
                });
            }
        });

    });

    router.post('/deleteselection/:id', function (req, res) {
        orderselectmodel.findById(req.params.id, function (err, post) {
            //console.log("selection deleted "+post);
            post.remove();
            res.redirect('/orders/productselect/' + post.orderid);
        });
    });

    //to cancel sale order
    router.post("/cancelorder/:id", function (req, res) {
        console.log("this is working");
        ordermodel.findById(req.params.id, function (err, ordermasterdata) {
            companymodel.findById(ordermasterdata.companyid, function (err, companydata) {
                orderselectmodel.find({
                    orderid: req.params.id
                }, function (err, orderdetailsdata) {
                    res.status(200).render("./orders/cancelorder", {
                        companydata: companydata,
                        ordermasterdata: ordermasterdata,
                        orderdetaildata: orderdetaildata
                    });
                });
            });
        });
    });




    //to dispatch full quantity of sale order
    router.post("/dispatchorder/:id", function (req, res) {
        ordermodel.findById(req.params.id).populate("company").exec(function (err, ordermasterdata) {
            if (err) {
                console.log(err)
            } else {
                companymodel.findById(ordermasterdata.companyid, function (err, companydata) {
                    orderselectmodel.findById({
                        orderid: req.params.id
                    }, function (err, post) {
                        res.status(200).redirect('/orders/dispatchorder/' + post.orderid);
                    });
                });
            };
        });
    });

    //to 
    router.post("/partdispatchorder/:id", function (req, res) {
        console.log("this is working");
        ordermodel.findById(req.params.id).populate("company").exec(function (err, ordermasterdata) {
            if (err) {
                console.log(err)
            } else {
                companymodel.findById(ordermasterdata.companyid, function (err, companydata) {
                    orderselectmodel.findById({
                        orderid: req.params.id
                    }, function (err, post) {
                        res.status(200).redirect('/orders/partdispatchorder/' + post.orderid);
                    });
                });
            };
        });
    });

    //start of other pages rout

    //to display pending order list
    router.get("/pendingso", function (req, res) {
        ordermodel.find({}, function (err, data) {
            res.status(200).render("./orders/pendingso", {
                data: data
            });
        });
    });



    //to display all sale orders with any status
    router.get("/allsaleorder", function (req, res) {
        ordermodel.find({}, function (err, data) {
            companymodel.find({}, function (err, info) {
                res.status(200).render("./orders/allsaleorder", {
                    data: data,
                    info: info
                });
            });
        });
    });

    //to display all orders with product orders
    router.get("/totalorders", function (req, res) {
        ordermodel.find({}, function (err, data) {
            orderselectmodel.find({}, function (err, info) {
                res.status(200).render("./orders/totalorders", {
                    data: data,
                    info: info
                });
            });
        });
    });

    //to delete sale order
    router.post('/delete/:id', function (req, res) {
        console.log("data gone");
        ordermodel.findById(req.params.id, function (err, post) {
            var backuporder = backupordermodel({
                customername: req.body.customer,
                ordernumber: req.body.onum,
                orderdate: req.body.odate,
                status: req.body.status,
                deliverydate: req.body.ddate,
                orderstatus: req.body.jobstatus,
                orderarch: req.body.arch,
                ordersize: req.body.size,
                orderdrilling: req.body.drilling,
                orderprating: req.body.prating,
                ordercontrolunit: req.body.controlunit,
                orderquantity: req.body.quantity,
                reason: 'deleted'
            });
            backuporder.save();
            post.remove(function (err, data) {
                res.redirect("../allsaleorder");
            });
        });
    });

    //to find pending orders
    router.post('/findpendingorders', function (req, res) {
        var query = {};
        if (req.body.onum != "") {
            query.ordernumber = req.body.onum;
        }
        if (req.body.odate != "") {
            query.orderdate = req.body.odate;
        }
        if (req.body.customer != "") {
            query.customername = req.body.customer;
        }
        console.log(typeof req.body.status !== undefined);
        if (req.body.status != "") {
            if (req.body.status == 'undefined') {
                query.status = req.body.status;
            }
        }
        if (req.body.ddate != "") {
            query.deliverydate = req.body.ddate;
        }
        console.log(query);
        ordermodel.find(query, function (err, data) {
            // console.log("pending order found");
            // console.log(data);
            res.status(200).render("./orders/pendingso", {
                data: data
            });
        });
    });

    router.post('/findallorders', function (req, res) {
        var query = {};
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
            delete query.ordernumber;
        }
        if (req.body.companyname != "") {
            query.customername = req.body.companyname;
        }
        if (req.body.companyname === undefined) {
            delete query.customername;
        }
        if (req.body.jobstatus != "") {
            query.orderstatus = req.body.jobstatus;
        }
        if (req.body.jobstatus === undefined) {
            delete query.orderstatus;
        }
        if (req.body.ddate != "") {
            query.deliverydate = req.body.ddate;
        }
        if (req.body.ddate === undefined) {
            delete query.deliverydate;
        }
        console.log(query);
        ordermodel.find(query, function (err, data) {
            console.log("orderfound");
            console.log(data);
            res.status(200).render("./orders/allsaleorder", {
                data: data
            });
        });
    });

    // all test router start from her

    //sale order test route
    router.get("/test", function (req, res) {


        res.status(200).render("./orders/tests");
    });

    //form validation test route
    router.get("/testb", function (req, res) {
        res.status(200).render("./orders/testb");
    });

    //select test route
    router.get("/testa", function (req, res) {
        ordermodel.find({}, function (err, data) {
            res.status(200).render("./orders/testa", {
                data: data
            });
        });
    });

    router.get("/orderhome", function (req, res) {
        ordermodel.find({}, function (err, data) {
            res.status(200).render("./orders/orderhome", {
                data: data
            });
        });
    });

    return router;
};