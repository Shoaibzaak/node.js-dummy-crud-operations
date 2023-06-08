
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

const tableOrdersSchema = new Schema({
    table: {
        type: String,
        ref: 'tables'
    },
    order: {
        type: String,
        ref: 'allOrders'
    },
    orderStatus: {
        type: String,
        default: "placed",
        enum: ["placed", "underpreparation", "underserving", "completed"]
    },
    tableStatus: {
        type: String,
        default: "vacant",
        enum: ["vacant", "booked"]
    },
    branch: {
        type: String,
        ref: 'restBranches'
    },
    addedby: {
        type: String,
        ref: 'users'
    },

    lastModifiedBy: {
        type: String,
        ref: 'users'
    },
    active: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        usePushEach: true
    })


module.exports = mongoose.model('tableOrders', tableOrdersSchema);
