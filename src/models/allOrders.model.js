
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

const allOrdersSchema = new Schema({
    clientName: {
        type: String
    },
    clientPhone: {
        type: String
    },
    table: {
        type: String,
        ref: 'tables'
    },
    dishes: [{
        type: String
    }],
    orderType: {
        type: String,
        default: "dining",
        enum: ["dining", "takeaway", "homedelivery"]
    },
    orderStatus: {
        type: String,
        defualt: "tempbill",
        enum: ["tempbill", "billpaid"]
    },
    orderClass: {
        type: String,
        default: "normal",
        enum: ["normal", "special", "extraordinary"]
    },
    orderFlow: {
        type: String,
        default: "billprinted",
        enum: ["billprinted", "servedontable", "completed"]
    },
    orderPlacedBy: {
        type: String,
        ref: 'users'
    },
    orderStartDate: {
        type: Date
    },
    orderEndDate: {
        type: Date
    },
    todaysMenu: {
        type: String,
        ref: 'todaysMenu'
    },
    menuItemId: [{
        type: String
    }],
   
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


module.exports = mongoose.model('allOrders', allOrdersSchema);
