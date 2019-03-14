//schema for bill of quantities
module.exports = function (mongoose) {
    var stockcalc = mongoose.Schema({
        itemname: {
            type: String
        },
        itemsize: {
            type: Number
        },
        itemprating: {
            type: String
        },
        itemdrilling: {
            type: String
        },
        srrsize: {
            type: Number
        },
        srrdrilling: {
            type: String
        },
        srrquantity: {
            type: Number
        },
        cusize: {
            type: Number
        },
        cudrilling: {
            type: String
        },
        cuquantity: {
            type: Number
        },
        trsize:{
            type: String
        },
        trquantity:{
            type: Number
        },
    })
    return stockcalc;
}