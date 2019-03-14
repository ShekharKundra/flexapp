var configValues = require("./config");

module.exports = {
    getDbConnectionString: function () {
        return "mongodb://" + configValues.uname + ":" + configValues.pass + "@ds137404.mlab.com:37404/easyflex";       
    }
};