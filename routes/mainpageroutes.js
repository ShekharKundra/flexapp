var router = require('express').Router({
    mergeParams: true
});

module.exports = function (bodyParser, ordermodel, srrmodel) {


    router.use(bodyParser.json());

    router.use(bodyParser.urlencoded({
        extended: true
    }));


    router.get('/', function (req, res) {
        ordermodel.find({}, function (err, data) {
            srrmodel.find({}, function (err, info) {
                // req.flash("title", "Home Page");
                res.status(200).render('home', {
                    info: info,
                    data: data
                });
            });

        });
    });

    router.get("*", function (req, res) {
        res.status(404).render("error404");
    });

    return router;
};