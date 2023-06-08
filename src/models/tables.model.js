
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

const tablesSchema = new Schema({
    tableName: {
        type: String
    },
    currentStatus: {
        type: String,
        default: "vacant",
        enum: ["vacant", "booked", "notavailable"]
    },
    tableType: {
        type: String,
        ref: 'tableTypes'
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


module.exports = mongoose.model('tables', tablesSchema);
