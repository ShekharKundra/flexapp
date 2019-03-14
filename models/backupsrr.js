// Srr Schema
module.exports = function (mongoose) {

    var backupsrr = mongoose.Schema({
        itemName: {
            type: String
        },
        size: {
            type: String
        },
        drilling: {
            type: String
        },
        quantity: {
            type: Number
        },
        addeddatetime: {
            type: Date,
            default: Date.now
        },
        reason: {
            type: String
        }

    });

    return backupsrr;
};