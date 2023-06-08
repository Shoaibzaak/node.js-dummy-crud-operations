
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

const restBranchesSchema = new Schema({
    branchName: {
        type: String
    },
    branchCode: {
        type: String
    },
    branchAddress: {
        type: String
    },
    branchPhone: {
        type: String
    },
    branchEmail: {
        type: String
    },
    branchLocation: {
        type: {
            type: String
        },
        coordinates: [{
            type: Number
        }]
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

    restBranchesSchema.index({ "location": "2dsphere" });
restBranchesSchema.on('index', function (err) {
    if (err) {
        console.error('Restuarant Branch index error: %s', err);
    } else {
        console.info('Restuarant Branch indexing complete');
    }
})

module.exports = mongoose.model('restBranches', restBranchesSchema);
