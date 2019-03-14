var router = require('express').Router({
    mergeParams: true
});

module.exports = function (bodyParser, orderselectmodel, ordermodel, stockcalcmodel) {

    router.use(bodyParser.json());

    router.use(bodyParser.urlencoded({
        extended: true
    }));

    router.get("/rejsareq", function (req, res) {
        ordermodel.find({
            orderstatus: 'Pending'
        }, function (err, ordermasterdata) {
            if (!err) {
                console.log(ordermasterdata);

            }
        });
        res.status(200).render("./requirements/rejsareq");
    });

    router.get("/rejhwreq", function (req, res) {
        res.status(200).render("./requirements/rejhwreq");
    });

    router.get("/cureq", function (req, res) {
        res.status(200).render("./requirements/cureq");
    });

    router.get("/srrreq", function (req, res) {
        res.status(200).render("./requirements/srrreq");
    });

    router.get("/trreq", function (req, res) {
        res.status(200).render("./requirements/trreq");
    });

    router.get("/rejdareq", function (req, res) {
        orderselectmodel.find({
            orderarch: 'REJ Double Arch'
        }, function (err, data) {
            orderselectmodel.aggregate({
                $match: {
                    orderarch: 'REJ Double Arch'
                }
            }, function (err, logs) {
                console.log(logs);
            });
            res.status(200).render("./requirements/rejdareq", {
                data: data
            });
        });

    });

    return router;
};